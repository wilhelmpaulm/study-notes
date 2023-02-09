import axios from 'axios';

// ask user to create their jira token
// https://id.atlassian.com/manage-profile/security/api-tokens

export default class JiraService {
    constructor({ host, username, apiToken, apiVersion = 2 }) {
        this.host = host;
        this.username = username;
        this.apiToken = apiToken;
        this.apiVersion = apiVersion;

        this.axiosInstance = axios.create({
            baseURL: `https://${host}.atlassian.net/rest/api/${apiVersion}/`,
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${username}:${apiToken}`
                ).toString('base64')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    jiraBaseUrl() {
        const { host, apiVersion } = this;
        return `https://${host}.atlassian.net/rest/api/${apiVersion}/`;
    }

    jiraHeaders() {
        const { username, apiToken } = this;
        return {
            Authorization: `Basic ${Buffer.from(
                `${username}:${apiToken}`
            ).toString('base64')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }

    async jiraPost({ url, body }) {
        try {
            const response = await this.axiosInstance.post(url, body);
            return response?.data;
        } catch (error) {
            console.error(error.response);
            return error.response.data;
        }
    }

    async jiraGet({ url, params }) {
        console.log(this.axiosInstance);
        try {
            const response = await this.axiosInstance.get(url, { params });
            return response?.data;
        } catch (error) {
            console.error(error.response);
            return error.response.data;
        }
    }

    async getUser() {
        const user = await this.jiraGet({
            url: 'myself',
        });
        const {
            key,
            accountId,
            accountType,
            name,
            emailAddress,
            displayName,
            active,
            timeZone,
        } = user;

        return {
            key,
            accountId,
            accountType,
            name,
            emailAddress,
            displayName,
            active,
            timeZone,
        };
    }

    async getProjects() {
        const { values: projects } = await this.jiraGet({
            url: 'project/search',
        });
        return (projects ?? []).map((project) => {
            const {
                id,
                key,
                name,
                projectTypeKey,
                properties,
                entityId,
                uuid,
                expand,
            } = project;

            return {
                id,
                key,
                name,
                projectTypeKey,
                properties,
                entityId,
                uuid,
                expand,
            };
        });
    }

    async getIssues() {
        const { issues } = await this.jiraGet({ url: 'search?jql=' });
        return (issues ?? []).map((issue) => {
            const {
                id,
                key,
                fields: {
                    project: {
                        id: projectId,
                        key: projectKey,
                        name: projectName,
                    },
                    issuetype: { id: issueId, name: issueName },
                    priority: { id: priorityId, name: priorityName },
                },
                description,
                summary,
                entityId,
                expand,
            } = issue;

            return {
                id,
                key,
                description,
                summary,
                entityId,
                expand,
                projectId,
                projectKey,
                projectName,
                issueId,
                issueName,
                priorityId,
                priorityName,
            };
        });
    }

    async getIssueMetaData() {
        const { projects } = await this.jiraGet({ url: 'issue/createmeta' });
        return (projects ?? []).map((project) => {
            const {
                id: projectId,
                key: projectKey,
                name: projectName,
                issuetypes,
            } = project;

            const issueTypes = issuetypes.map((type) => {
                const {
                    id: typeId,
                    description: typeDescription,
                    name: typeName,
                    fields,
                } = type;
                return { typeId, typeDescription, typeName, fields };
            });

            return {
                projectId,
                projectKey,
                projectName,
                issueTypes,
            };
        });
    }

    async createIssue({ assigneeId, projectId, typeId, summary, description }) {
        const body = {
            fields: {
                assignee: {
                    id: assigneeId,
                },
                project: {
                    id: projectId,
                },
                description,
                summary,
                issuetype: {
                    id: typeId,
                },
                labels: ['task'],
            },
        };

        const { id, key } = await this.jiraPost({ url: 'issue', body });
        return { id, key };
    }
}
