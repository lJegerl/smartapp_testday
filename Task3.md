#BUG-01 — Несколько пунктов футера ведут на главную страницу вместо соответствующих разделов

##### Severity: Major

##### Priority: High

##### Где:

smartapp.technology -> footer -> Industries / Services.

##### Шаги воспроизведения:

- Открыть https://smartapp.technology/
- Прокрутить страницу вниз до footer.
- В разделе Industries нажать Manufacturing.
- Вернуться назад.
- В разделе Services нажать Cloud-based development или Digital marketing.

##### Фактический результат:

Ссылки ведут на главную страницу сайта, а не на соответствующие страницы разделов.

##### Ожидаемый результат:

Manufacturing должен открывать страницу Manufacturing, Cloud-based development — страницу соответствующего сервиса, Digital marketing — страницу Digital Marketing.

#BUG-02 — Неактуальная дата обновления Privacy Policy

##### Severity: Major

##### Priority: Medium

##### Где:

smartapp.technology -> Footer -> Privacy Policy.

##### Шаги воспроизведения:

- Открыть smartapp.technology.
- В footer открыть Privacy Policy.
- Проверить дату обновления документа.

##### Фактический результат:

В Privacy Policy указано Last updated: 08.05.2020, при этом основной сайт содержит актуальный контент и copyright © 2026.

##### Ожидаемый результат:

Privacy Policy должна соответствовать актуальной версии сайта и текущей политике обработки данных либо явно сообщать, что документ является актуальным.

#BUG-03 — Дублирование одинаковых Case Studies (? не уверен)

##### Severity: Minor

##### Priority: Medium

##### Где:

1. smartapp.technology -> Header -> Case Studies
2. smartapp.technology -> Footer -> Web & Software development

##### Шаги воспроизведения:

- Открыть smartapp.technology.
- В header открыть Case Studies.
- Раскрыть все Cases.
- Нажать на SmarApp (Вернуться на главную).
- Пролистать вниз до footer и открыть Web & Software development.
- Прокрутить до Our Web & Software Case Studies
- Раскрыть все Cases.

##### Фактический результат:

Одни и те же проекты присутствуют в блоке повторно.

##### Ожидаемый результат:

Каждый Case Study должен отображаться один раз, если только повторение не является частью карусели и один из экземпляров намеренно скрывается для конкретного breakpoint.
