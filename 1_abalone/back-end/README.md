# Initial configuration

## Create a virtual env (optional)

Install virtualenv

```
pip install virtualenv
```

Create a new environment

```
virtualenv -p python3 env
```

Activate the new environment

```
./env/Scripts/activate
```

## Install dependencies

Should be located on `./1_abalone/back-end/` folder.

```
pip install -r requirements.txt
```

## Start the API

```
python ./app.py
```
