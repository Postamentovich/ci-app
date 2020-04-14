export const mockConfigResponse = {
    data: {
        id: "0e0fb177-b23e-48ed-94d0-a46474edd8de",
        repoName: "Postamentovich/chat",
        buildCommand: "yarn dev",
        mainBranch: "master",
        period: 10,
    },
};

export const mockConfigRequest = {
    repoName: "Postamentovich/chat",
    buildCommand: "yarn dev",
    mainBranch: "master",
    period: 10,
};

export const mockBuildListResponse = {
    data: [
        {
            id: "d3d809a1-bd93-40d5-80af-f0ed8f9eeeb7",
            configurationId: "0e0fb177-b23e-48ed-94d0-a46474edd8de",
            buildNumber: 52,
            commitMessage: "Merge pull request #2 from Postamentovich/test",
            commitHash: "1575271775458c1d6f90ededa3a808e1cd288a65",
            branchName: "master",
            authorName: "Viacheslav Zinovev",
            status: "Success",
            start: "2020-04-12T21:06:45.13",
            duration: 3068,
        },
    ],
};

export const mockBuildDetailsResponse = {
    data: {
        id: "d3d809a1-bd93-40d5-80af-f0ed8f9eeeb7",
        configurationId: "0e0fb177-b23e-48ed-94d0-a46474edd8de",
        buildNumber: 52,
        commitMessage: "Merge pull request #2 from Postamentovich/test",
        commitHash: "1575271775458c1d6f90ededa3a808e1cd288a65",
        branchName: "master",
        authorName: "Viacheslav Zinovev",
        status: "Success",
        start: "2020-04-12T21:06:45.13",
        duration: 3068,
    },
};

export const mockLogResponse = "123";

export const mockAddBuildResponse = {
    data: [
        {
            id: "d3d809a1-bd93-40d5-80af-f0ed8f9eeeb7",
            buildNumber: 52,
            status: "Waiting",
        },
    ],
};
