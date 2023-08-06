<h1 id="title" align="center">JSuperman cli</h1>

<p align="center"><img src="https://socialify.git.ci/DumiJDev/superman/image?description=1&font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Solid&pulls=1&stargazers=1&theme=Dark" alt="project-image"></p>

<p id="description">The project is a Node.js library that provides a command-line interface (CLI) for running API test collections using Newman. It allows users to execute multiple collections by specifying JSON file paths or URLs. The library supports optional environment files and generates reports in CLI HTML and Allure formats. Its goal is to simplify API testing provide detailed reports and aid in quality assurance.</p>

<h2>🛠️ Installation Steps:</h2>
npm:
<p>1. npm install -g jsuperman</p>
yarn:
<p>2. yarn add global jsuperman</p>

<h2>🏃🏾‍♂️ How run</h2>

<p>Is mandatory to pass the path to a config file (json or yaml) with following format:</p>

<p>jsuperman -f /path/to/config/file</p>

<code>
    <pre>
    [
        {
            "collection": "path/to/exported/collection/json/or/a/postman/collection/url",
            "environment": "path/to/environment/json"
        }
    ]
    </pre>
</code>

<h3>* Up allure server with allure results</h3>

<p>jsuperman -f /path/to/config/file -s </p>

<p>In quiet mode</p>
<p>jsuperman -f /path/to/config/file -s -q </p>

<p>Specified port</p>
<p>jsuperman -f /path/to/config/file -s -p <i>port</i></p>

<h3>Scheduling tests</h3>

<p>To schedule tests with <b>JSuperman</b> we use <i>cron</i> flag with cron expression:</p>

<p>jsuperman -f /path/to/config/file --cron "0 0 0 * * *"</p>

or

<p>jsuperman -f /path/to/config/file -c "0 0 0 * * *"</p>

<h3>Send email with results (beta)</h3>

<p>jsuperman -f /path/to/config/file -e /path/to/email/config/file/json</p>

structure:

<code>
    <pre>
        {
            "smtp": {
                "host": "host",
                "port": port,
                //auth is optional
                "auth": {
                    "user": "user",
                    "pass": "password"
                    }
                },
            "template": "path/to/ejs/template/file",
            "content": "Content of email if doesn't a template",
            "subject": "subject",
            "to": [
                "email1",
                "emailn"
            ],
            "from": {
                "name": "your personal name or team name",
                "email": "email"
            }
}
    </pre>
</code>

<h2>💻 Built with</h2>

Technologies used in the project:

- Typescript
- NodeJS

<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="dumijdev" data-color="#FFDD00" data-emoji=""  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>

<h2>🛡️ License:</h2>

This project is licensed under the MIT

<h2>Contributing</h2>

Opened for contributions 😅
