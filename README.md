<p align="center">
    <a href="https://github.com/yiisoft" target="_blank">
        <img src="https://avatars0.githubusercontent.com/u/993323" height="100px">
    </a>
    <h1 align="center">Yii 2 Advanced Project Template</h1>
    <br>
</p>

Yii 2 Advanced Project Template is a skeleton [Yii 2](http://www.yiiframework.com/) application best for
developing complex Web applications with multiple tiers.

The template includes three tiers: front end, back end, and console, each of which
is a separate Yii application.

The template is designed to work in a team development environment. It supports
deploying the application in different environments.

Documentation is at [docs/guide/README.md](docs/guide/README.md).

[![Latest Stable Version](https://img.shields.io/packagist/v/yiisoft/yii2-app-advanced.svg)](https://packagist.org/packages/yiisoft/yii2-app-advanced)
[![Total Downloads](https://img.shields.io/packagist/dt/yiisoft/yii2-app-advanced.svg)](https://packagist.org/packages/yiisoft/yii2-app-advanced)
[![build](https://github.com/yiisoft/yii2-app-advanced/workflows/build/badge.svg)](https://github.com/yiisoft/yii2-app-advanced/actions?query=workflow%3Abuild)

DIRECTORY STRUCTURE
-------------------

```
common
    config/              contains shared configurations
    mail/                contains view files for e-mails
    models/              contains model classes used in both backend and frontend
    tests/               contains tests for common classes    
console
    config/              contains console configurations
    controllers/         contains console controllers (commands)
    migrations/          contains database migrations
    models/              contains console-specific model classes
    runtime/             contains files generated during runtime
backend
    assets/              contains application assets such as JavaScript and CSS
    config/              contains backend configurations
    controllers/         contains Web controller classes
    models/              contains backend-specific model classes
    runtime/             contains files generated during runtime
    tests/               contains tests for backend application    
    views/               contains view files for the Web application
    web/                 contains the entry script and Web resources
frontend
    assets/              contains application assets such as JavaScript and CSS
    config/              contains frontend configurations
    controllers/         contains Web controller classes
    models/              contains frontend-specific model classes
    runtime/             contains files generated during runtime
    tests/               contains tests for frontend application
    views/               contains view files for the Web application
    web/                 contains the entry script and Web resources
    widgets/             contains frontend widgets
vendor/                  contains dependent 3rd-party packages
environments/            contains environment-based overrides
```

<h2>Инструкция по установке</h2>

<h3>0) Настройка рабочего окружения</h3>

<ol>
   <li>Установка php7.4</li>
   <li>Установка nginx</li>
   <li>Установка PostgreSQL</li>
</ol>

<h4>Установка php7.4</h4>
```
sudo apt install php7.4
sudo apt install php7.4-fpm
sudo apt install php7.4-cli
sudo apt install php7.4-common
sudo apt install php7.4-curl
sudo apt install php7.4-dba
sudo apt install php7.4-gd
sudo apt install php7.4-imap
sudo apt install php7.4-intl
sudo apt install php7.4-json
sudo apt install php7.4-ldap
sudo apt install php7.4-mbstring
sudo apt install php7.4-odbc
sudo apt install php7.4-opcache
sudo apt install php7.4-opcachepgsql
sudo apt install php7.4-pgsql
sudo apt install php7.4-readline
sudo apt install php7.4-soap
sudo apt install php7.4-xml
sudo apt install php7.4-xmlrpc
sudo apt install php7.4-zip
```

<h4>Установка nginx</h4>
```
sudo apt install nginx-full
sudo vim /etc/nginx/sites-available/frontend
```

В шаблон default вставляем следующий конфиг:
```
server {
        listen 80;
        listen [::]:80;

        root path-to-root/yii2-advanced-gulp-rbac/frontend/web;

        index index.html index.htm index.nginx-debian.html index.php;

        server_name frontend.localhost;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ /index.php?$args;
        }

        # pass PHP scripts to FastCGI server
        #
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;

                # With php-fpm (or other unix sockets):
                fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
                # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
        }
}
```

Аналогичный конфиг прописываем для backend, затем выполняем:
```
sudo ln /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
sudo ln /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo service nginx restart
```

<h4>Установка PostgreSQL</h4>
```
# Установка
sudo apt install postgresql postgresql-contrib

# создание базы данных и пользователя
sudo -su postgres
psql
CREATE DATABASE db_name;
CREATE USER user_name WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE db_name TO user_name;
\q
exit
```

<h3>1) Скачать проект из github</h3>
```
#Инициализируем пустой репозиторий
git init

#Скачиваем проект
git clone https://github.com/IlyaTheGreat/yii2-advanced-gulp-rbac.git
```

<h3>2) Перевести yii в режим dev</h3>

```
# подтягиваем зависимости пакетов
composer install

# выбор окружения (выбираем DEV [0 , yes])
php init
```

<h3>3) Конфигурация приложения</h3>
   <p>Заменить содержимое файла common/config/main-local.php на /common/config/main-local.php.example</p>
   <p>Заполнить поля db, mailer актуальными данными</p>

<h3>4) Установка миграций</h3>

```
php yii migrate --migrationPath=@mdm/admin/migrations
php yii migrate --migrationPath=@yii/rbac/migrations/
```

<h3>5) Создание ролей и администратора</h3>

```
php yii rbac/init
php yii user/create-admin

#кастомная миграция - столбец с токеном верификации (необходимо для верификации email)
php yii migrate
```

<h3>6) Установка node.js</h3>

```
# Установка глобального ПО
sudo apt-get update
sudo apt-get install nodejs

sudo apt-get install npm

npm install --global gulp

# Разворачиваем ноду в корне проекта
npm init #все вопросы можно пропустить
npm install gulp@^3.9.1

#если появятся ошибки, выполнить:
npm install
npm audit fix

# Установка пакетов gulp
npm i gulp-sass gulp-clean-css gulp-rename gulp-notify gulp-minify gulp-autoprefixer gulp-clean gulp-combine-mq gulp.spritesmith
```

<h2>Для фронтенда</h2>
<ul>
   <li>Рабочая папка для фронта - frontend/web/source</li>
   <li>
      Чтобы внесенные изменения вступили в силу, необходимо
      пересобрать css и js консольной командой "gulp"
   </li>
</ul>