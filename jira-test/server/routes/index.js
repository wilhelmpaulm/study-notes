import express from 'express';
import JiraService from '../services/JiraService';
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    const jiraService = new JiraService({
        host: '',
        username: '',
        apiToken:
            '',
    });

    try {
        const projects = await jiraService.getProjects();
        // res.json(projects);

        // const issues = await jiraService.getIssues();
        // res.json(issues);

        const user = await jiraService.getUser();
        // res.json(user);

        const meta = await jiraService.getIssueMetaData();
        // res.json(meta);

        const issue = await jiraService.createIssue({
            projectId: projects[0].id,
            assigneeId: user.accountId,
            typeId: meta[0].issueTypes[0].typeId,
            description: 'test description 001',
            summary: 'test summary 001',
        });
        res.json(issue);
    } catch (error) {
        next(error);
    }
});

export default router;
