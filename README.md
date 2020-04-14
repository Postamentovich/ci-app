# School CI Server

## ДЗ по тестированию

Домашнее задание не закончено, написал часть юнит тестов, за интеграционные еще не принимался. <br>
Запуск тестов

```shell
$ npm install
$ npm run test
```

### Добавлены следующие юнит тесты:

#### Серверная часть:

-   Тестирование эндпонитов api/settings
-   Тестирование эндпонитов api/builds
-   Тестирование работы с локальным репозиторием:
    -   Клонирование репозитория
    -   Переключение ветки репозитория
    -   Получение последних коммитов
    -   Добавление билда в очередь


#### Клиентская часть:

-   Тестирование хелперов (форматирование времени, форматирование даты)

---

## Описание проекта


## Установка и запуск

```shell
$ npm install
$ npm run start
```

#### NPM скрипты

`npm run start` - запуск проекта <br>
`npm run test` - запуск тестов <br>
`npm run build` - сборка проекта <br>
`npm run analyze` - анализ собранного бандла <br>

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

-   Typescript
-   @bem/react
-   Redux Toolkit
-   Jest

#### Структура проекта

```
├── config/               # Конфигурационные файлы для webpack, jest
├── scripts/              # NPM скрипты
└── src/                  # Исходные файлы
    ├── __test__/         # Тесты
    ├── client/           # Клиентская часть
    ├── server/           # Серверная часть
    └── shared/           # Общая часть

```

#### В планах доделать:

Клиентская часть:

-   Добавить автоматический запрос лога
-   Разобраться с варнингом для кнопки
-   прикрутить SASS, после изменения архитектуры проета остался только чистый css

Серверная часть:

-   Поправить логику получения последних коммитов
-   Поправить порядок билдов
