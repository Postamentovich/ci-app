# School CI Server

Build Server и Build Agent находятся в репозитории https://github.com/Postamentovich/shri-ci-build

## Описание проекта

## Установка и запуск

```shell
$ npm install
$ npm run start
```

#### NPM скрипты

`npm run start` - запуск проекта <br>
`npm run test` - запуск юнит тестов <br>
`npm run build` - сборка проекта <br>
`npm run analyze` - анализ собранного бандла <br>
`npm run e2e` - запуск интеграционных тестов <br>

## Описание проекта

### Серверная часть

#### Переменные окружения

В корне проекта в файл .env нужно добавить токен авторизации https://hw.shri.yandex/

API_TOKEN=YOUR_API_TOKEN

#### Node.js

Версия Node.js - 13.5

#### Документация

Swagger доступен по ссылке /swagger

### Клиентская часть

#### Используемые технологии

- Typescript
- @bem/react
- Redux Toolkit
- Jest
- Hermione

#### Структура проекта

```
├── config/               # Конфигурационные файлы для webpack, jest
├── scripts/              # NPM скрипты
└── src/                  # Исходные файлы
    ├── __test__/         # Тесты
    ├── __mocks__/        # Моки для тестов
    ├── client/           # Клиентская часть
    ├── server/           # Серверная часть
    └── shared/           # Общая часть

```
