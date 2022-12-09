# TORONTO FITNESS CLUB

Welcome to Toronto Fitness Club, a fully functional fitness club website with pre-populated classes and studios, at your perusal.

## Installation

The following bash file assumes that you have [pip](https://pypi.org/project/pip/) and [npm](https://www.npmjs.com/) as well as all its prerequisites installed.

```bash
./startup.sh
```
Then, to start the project:

```bash
. ./run.sh
```
This will run the bash file in your current terminal window. The backend will be run in the background, so in order to kill it, you must:

```bash
$ ps

  PID TTY           TIME CMD
  665 ttys000    0:00.17 -zsh
  666 ttys001    0:00.07 -zsh
70375 ttys007    0:00.16 /opt/homebrew/Cellar/python@3.10/3.10.8/Frameworks/Pyt
70860 ttys007    0:11.18 /opt/homebrew/Cellar/python@3.10/3.10.8/Frameworks/Pyt

$ kill 70375

[2]  + done       python3 manage.py runserver
```
## Usage

The credentials to the admin account:
```
Username: admin
Password: admin123
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)