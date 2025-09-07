# Mini Car Catalogue SSR app

[Документация NUXT](https://nuxt.com/docs/getting-started/introduction)

Это приложение на Nuxt3 для отображения списка автомобилей из локального ЖСОН и детального отображения информации о каждом автомобиле путем обращения к внешнему [API carquery.com](https://www.carqueryapi.com/)
Это приложение обеспечивает функциональный поиск автомобилей по параметрам make, model и year

## Установка

Сначала нужно установить зависимости, мы крутые ребята и поэтому будем использовать **yarn**

```bash
yarn install
```

## Отладка

Для запуска в режиме отладки с **hot-reload** используем 

```bash
yarn dev
```

## Билд

Используем

```bash
yarn build:ssr
yarn build:spa
```

Для генерации SSR- и SPA-билдов соответственно, а затем

```bash
yarn start:ssr
yarn preview:spa
```

для их запуска

### Содержание

- server/mock/cars.json - локальный ЖСОН с базовыми параметрами авто (make, model, year)
- server/api/cars.get.ts - локальный эндпоинт, отдающий ЖСОН
- server/car-details/[make]/[year].ts - локальный эндпоинт, который делает запрос к carquery
- types/car.ts - типизация авто
- stores/cars.ts - pinia-storage с кэшированием параметров и persisted state
- plugins/piniaPersist.client.ts - плагин обеспечивающий persisted state для стора
- components/CarCard.vue и components/CarCardSkeleton.vue - компонент карточки автомобиля и его скелетон
- components/SearchFilters.vue - компонент поиска с базовыми фильтрами и debounce
- Страницы /index и /car/[id].vue

### Потенциал для улучшения

1. Настроить и подключить api unsplash.com для отображения карточек автомобилей
2. Добавить prettier, и соответствующий скрипт stylelint в package.json
3. Покрыть код тестами, например с помощью Vitest (Jest)
4. Разработать дизайн и сделать приложение красивым
5. Добавить композаблс-адаптеры для дальнейших манипуляций с данными авто и заполнения их карточек