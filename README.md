<h1 id="title" align="center">JSuperman CLI</h1>

<p align="center"><img src="https://socialify.git.ci/DumiJDev/superman/image?description=1&font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Solid&pulls=1&stargazers=1&theme=Dark" alt="Project Image"></p>

<p id="description">JSuperman CLI is a monitoring tool built on Newman, designed for executing API tests. It enables users to run test collections by specifying JSON file paths or URLs. The tool supports optional environment files and generates reports in CLI HTML and Allure formats. Its aim is to simplify API testing, provide detailed reports, and assist in quality assurance.</p>

<h2>🛠️ Installation:</h2>

You can install JSuperman CLI globally using npm or yarn:

**Via npm:**
```
npm install -g jsuperman
```

**Via yarn:**
```
yarn global add jsuperman
```

<h2>🏃🏾‍♂️ How to Use:</h2>

To execute tests, provide the path to a configuration file (json or yaml) with the following format:

```
jsuperman -f /path/to/config/file
```

Example configuration file structure:

```json
[
    {
        "collection": "path/to/exported/collection/json/or/a/postman/collection/url",
        "environment": "path/to/environment/json"
    }
]
```

**Available Options:**
- **-g, --globals:** Set global variables for the test execution.
- **-p, --port:** Specify the port for accessing the generated report.
- **-i, --iteration:** Number of test execution iterations (default is 1).
- **-u, --url:** URL to access test collections and environments.
- **-s, --serve:** Run a server after generating the report for easy access.
- **-n, --native:** Use the native reporter to generate the report (default is false).
- **-rp, --report:** URL to send the report results after test execution.
- **-e, --export:** Export test results to a JSON file at the specified path.
- **-q, --quiet:** Run the server in quiet mode to minimize log output.
- **-c, --cron:** Schedule JSuperman to run using a cron expression.
- **-ec, --email-config:** SMTP configuration in key:value format separated by semicolons.
- **-r, --rest:** Enable REST endpoint to get results.
- **-f, --file:** Path to a file containing collections and environments.

**Example:**
```
jsuperman -f /path/to/config/file -s -p 8080
```

<h2>📊 Reports and Results:</h2>

After running the tests, you can access the results using the REST endpoint:

```
GET http://hostname:7777/jsuperman/results
```

<h2>💻 Technologies Used:</h2>

Technologies used in the project:

- Typescript
- NodeJS

**Support the Project:**
If you find JSuperman CLI helpful, consider [buying me a coffee](https://www.buymeacoffee.com/dumijdev)!

<h2>🛡️ License:</h2>

This project is licensed under the MIT License. You are free to use it as a base for other projects or for personal use on your machines. If changing the license is necessary, please let me know.

<h2>Contributions</h2>

We are open to contributions! Feel free to collaborate with us.
