# School CI Server

## Установка и запуск

```shell
$ git checkout react
$ npm install
$ cd client && npm install
$ npm run build
$ cd ..
$ npm run start
```

## Описание проекта

### Серверная часть

#### Переменные окружения

- API_TOKEN - токен https://hw.shri.yandex/ нужен для работы сервера
- PORT - выбранный порт (по умолчанию - 4000 для сервера, 3000 - клиент)
- LOG_LEVEL - уровень логирования в консоли (debug | info)

#### NPM скрипты

`npm run start` - запуск сервера в production режиме <br>
`npm run server` - запуск сервера в development режиме <br>

#### Node.js

Версия Node.js - 13.5

#### Документация

Swagger доступен по ссылке /swagger

### Клиентская часть

#### NPM скрипты

`npm run dev` - запуск клиента и сервера в development режиме <br>

#### Используемые технологии

- Typescript
- @bem/react
- Redux Toolkit

#### Структура проекта

- api <br>
  Axios обертки для выполнения запросов

- components <br>
  Базовые блоки

- containers <br>
  Контентные блоки

- pages <br>
  Страницы

- store <br>
  Redux

#### В планах доделать:

Клиентская часть:

- Добавить автоматический запрос лога
- Разобраться с варнингом для кнопки
- Добавить SSR

Серверная часть:

- Поправить логику получения последних коммитов
