## Functional testing with Pytest and Selenium

### Requirements
* Python 3.8
* Pipenv
* Selenium webdriver, Chrome, Firefox

### Installation
Install dependencies and activate the virtual environment
```sh
pipenv install --dev
pipenv shell
```

### Run testcase
For Chrome
```sh
pytest --driver Chrome
```
For Firefox
```sh
pytest --driver Firefox
```