import { PrismaClient } from "./prisma/generated/client.ts";
const prisma = new PrismaClient();
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    ensureBasics();
    const tokenGiven = await http(
        "https://opentdb.com/api_token.php?command=request",
    );
    const tokenToUse = tokenGiven.token;

    // Fetch and seed questions for each category
    const categories = await prisma.category.findMany();
    for (const category of categories) {
        const countData = await http(
            `https://opentdb.com/api_count.php?category=${category.opentdb_id}`,
        );
        let questionsLeft = countData.category_question_count.total_question_count;
        console.log(questionsLeft);
        while (questionsLeft > 0) {
            const maxQuestions = Math.min(questionsLeft, 50); // Limit to 50 questions per batch
            questionsLeft -= maxQuestions;
            const apiUrl =
                `https://opentdb.com/api.php?amount=${maxQuestions}&token=${tokenToUse}&category=${category.opentdb_id}`;

            console.log(`Fetching questions for category: ${category.name}`);
            const questionsData = await http(apiUrl);

            for (const question of questionsData.results) {
                // Create the correct answer in the database
                const correctAnswer = await createAnswer(question.correct_answer);

                // Create the incorrect answers in the database
                const incorrectAnswers = await Promise.all(
                    question.incorrect_answers.map(async (incorrect: any) => {
                                return await createAnswer(incorrect);
                    }),
                );

                // Create the question and connect it with the answers
                await prisma.question.create({
                    data: {
                        question: question.question,
                        difficulty: { connect: { level: question.difficulty } },
                        type: { connect: { name: question.type } },
                        category: { connect: { id: category.id } },
                        correct_answer: {
                            connect: { id: correctAnswer.id },
                        },
                        incorrect_answers: {
                            connect: incorrectAnswers.map((ans) => ({ id: ans.id })),
                        },
                    },
                });
                console.log(`1 question added to: ${category.name}`);
            }

            await delay(5000); // Wait 5 seconds before the next API call
            console.log(
                `Seeded ${questionsData.results.length} questions for ${category.name}`,
            );
        }

        console.log("Seeding completed!");
    }

    main()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

console.log("Seed data inserted");
main();

export async function http(
    request: RequestInfo,
): Promise<any> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
}

export async function ensureBasics() {
    //only checking category as they are if it is seeded the others will be too
    const existingCategories = await prisma.category.findMany();
    if (existingCategories.length > 0) {
        return;
    }
    await prisma.difficulty.createMany({
        data: [
            { level: "easy" },
            { level: "medium" },
            { level: "hard" },
        ],
    });

    // Seed types
    await prisma.type.createMany({
        data: [
            { name: "multiple" },
            { name: "boolean" },
        ],
    });

    const categoriesApi = await http("https://opentdb.com/api_category.php");
    // Seed categories
    await prisma.category.createMany({
        data: categoriesApi.trivia_categories.map((cat: any) => ({
            opentdb_id: cat.id,
            name: cat.name,
        })),
    });
}

export async function createAnswer(answerText: any){
    const thisAnswer = await prisma.answer.findFirst({
        where: {answer: answerText},
    });
    if(thisAnswer != null ){
        return thisAnswer;
    }
 const answerCreated = await prisma.answer.create({
                    data: {
                        answer: answerText,
                    },
                });
return answerCreated;
}