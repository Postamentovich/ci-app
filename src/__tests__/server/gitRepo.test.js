const gitRepo = require("../../server/utils/git-repo");
const { storageAPI } = require("../../server/api/storage-api");

describe("Тестирование взаимодействия с локальным репозиторием", () => {
    test("Получение последних коммитов", async () => {
        const buildList = {
            data: [
                {
                    commitHash: "123",
                }
            ],
        };

        storageAPI.getBuildList = jest.fn(() => ({ data: buildList }));

        gitRepo.run = jest.fn(() => ({
            stdout: "123{SPLIT}124{SPLIT}",
        }));

        const commits = await gitRepo.getRecentCommits();

        expect(commits).toEqual(["124"]);
    });

    
});
