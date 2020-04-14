const gitRepo = require("../../server/utils/git-repo");
const { storageAPI } = require("../../server/api/storage-api");
import { mockAddBuildResponse } from "../mocks/mocks-routes";

describe("Взаимодействие с локальным репозиторием", () => {
    test("Получение последних коммитов", async () => {
        const buildList = {
            data: [
                {
                    commitHash: "123",
                },
            ],
        };

        storageAPI.getBuildList = jest.fn(() => ({ data: buildList }));

        gitRepo.run = jest.fn(() => ({
            stdout: "123{SPLIT}124{SPLIT}",
        }));

        const commits = await gitRepo.getRecentCommits();

        expect(commits).toEqual(["124"]);
    });

    test("Добавление билда в очередь", async () => {
        gitRepo.run = jest.fn(() => ({
            stdout: "commit{SPLIT}author{SPLIT}",
        }));

        storageAPI.setBuildRequest = jest.fn(() => ({ data: mockAddBuildResponse }));

        const info = await gitRepo.addBuildToQueue("123");

        expect(info).toEqual(mockAddBuildResponse);
    });

    test("Переключение ветки репозитория", async () => {
        gitRepo.run = jest.fn();

        gitRepo.localFolderName = "folderName";

        gitRepo.checkout("branchName");

        expect(gitRepo.run).toHaveBeenCalledWith(`cd folderName && git checkout branchName`);
    });

    test("Клонирование репозитория", async() => {
        
        gitRepo.removeLocalRepo = jest.fn(() => true);
        
        gitRepo.localFolderName = "folderName";
        
        gitRepo.run = jest.fn();

        await gitRepo.clone("repoName");

        expect(gitRepo.run).toHaveBeenCalledWith(
            `git clone https://github.com/repoName folderName`
        );
    });
});
