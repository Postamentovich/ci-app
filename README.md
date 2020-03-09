# Домашнее задание - Верстка

> ### Правильное использование БЭМ-сущностей

> Какие части макета являются одним и тем же блоком?

В макете можно выделить следующие слои и блоки:

1. Тема
   - Theme
2. Каркас
   - Layout
3. Паттерны
   - Header
   - Footer
   - Card
4. Контент
   - Typo
   - Button
   - Text Input
   - Log
5. Страницы

> Какие стили относятся к блокам, а какие к элементам и модификаторам?

К модификаторам относятся стили, которые отвечаю за внешний вид и состояние блока.
К элементам относятся стили, которые отвечают за позиционирование элемента внутри блока.

> Где нужно использовать каскады и почему?

Каскады использовал для изменения стилей элемента, в зависимости от модификатора установленного на родительском блоке.

> ### Консистентность

> Какие видите базовые и семантические константы?

К базовым константам можно отнести базовые цвета, отступы, размер шрифта, межстрочное расстояние.
К семантическим константам можно отнести цвета теста, цвета фонов, цвета границ.

> Какие видите закономерности в интерфейсе?

На каждой странице присутствует Header и Footer.
Отступы базового контейнера на каждой странице одинаковые.

> ### Адаптивность

> Где видите вариативность данных и как это обрабатываете?

Сообщение в коммите может быть различной длины. На десктопе комментарий в одну строчку и обрезается многоточием.
Название ветки может быть различной длины. Решается на мобильной версии обрезанием строки с многоточием и переносом хеша на отдельную строку. На десктопе обрезаниме с многоточием.
Имя пользователя может быть различной длины. Решается обрезанием строки с многоточием.
Длина строки в логе может различаться. Решается добавлением скрола.
Название ветки может отличться.

> Какие видите особенности, связанные с размером экрана?

Заголовок страницы уменьшается в мобильной версии.
Отступы уменьшаются в мобильной версии.
Некоторые кнопки растягиваются по всей ширине экран в мобильной версии.

> Что еще повлияло на вашу вёрстку?

Сроки :)

Работу можно использовать для разбора.