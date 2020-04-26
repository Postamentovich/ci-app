# School CI Server

Build Server и Build Agent находятся в репозитории https://github.com/Postamentovich/shri-ci-build

## ДЗ по типизации

<em>Трудоёмкость перевода проекта на TypeScript. Самые сложные моменты в работе.</em><br>
Клиент изначально писался на Typescript, поэтому основная работа заключалась переписывании сервера на Typescript.

<em>Какие в процессе перевода были найдены ошибки.</em><br>
Было добавлено несколько проверок, на существование переменных.

<em>Решили ли вы вливать данный PR, или предпочитаете работать с JavaScript? Почему?</em><br>
PR будет смержен в основной проект.

Инструкции по запуску представлены ниже, ничего дополнительно компилировать не нужно.

---

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
