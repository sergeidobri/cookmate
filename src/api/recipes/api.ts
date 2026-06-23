import type { Recipe } from "@/types/recipes";
import type { GetRecipesListResponse } from "./types";
import apiClient from "../apiClient";
import { RECIPES_ENDPOINTS } from "./endpoints";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Паста Карбонара",
    description:
      "Классическая итальянская паста с беконом, яйцами и пармезаном",
    image:
      "https://s1.eda.ru/StaticContent/Photos/Upscaled/150525210126/150601174518/p_O.jpg",
    calories: 650,
    approximateTime: "25 минут",
    components: [
      { title: "Спагетти", quantity: "400", measurement: "г", available: true },
      { title: "Бекон", quantity: "200", measurement: "г", available: true },
      { title: "Яйца", quantity: "4", measurement: "шт", available: false },
      { title: "Пармезан", quantity: "100", measurement: "г", available: true },
      {
        title: "Черный перец",
        quantity: "1",
        measurement: "ч.л.",
        available: true,
      },
    ],
    matchScore: 75,
  },
  {
    id: "2",
    title: "Цезарь с курицей",
    description: "Свежий салат с хрустящими сухариками и соусом Цезарь",
    image:
      "https://images.gastronom.ru/LoVJjeEYXJQ3vR2Yn8WtlivB0eZ78Rtu417zEnX1mZs/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2IxMzU5MzRkLWI1OTAtNDQ4Zi05MjA3LWQ5YzEzM2M2ODZlNy5qcGc.webp",
    calories: 420,
    approximateTime: "20 минут",
    components: [
      {
        title: "Куриное филе",
        quantity: "300",
        measurement: "г",
        available: true,
      },
      {
        title: "Салат романо",
        quantity: "1",
        measurement: "пучок",
        available: false,
      },
      { title: "Сухарики", quantity: "50", measurement: "г", available: true },
      { title: "Пармезан", quantity: "50", measurement: "г", available: true },
      {
        title: "Соус Цезарь",
        quantity: "100",
        measurement: "мл",
        available: false,
      },
    ],
    matchScore: 56,
  },
  {
    id: "3",
    title: "Борщ",
    description: "Традиционный украинский суп со свеклой и мясом",
    image:
      "https://cdn.lifehacker.ru/wp-content/uploads/2019/09/Kak_prigotovit_borshh_po_klassicheskomu_receptu_1758180874.jpeg",
    calories: 380,
    approximateTime: "2 часа",
    components: [
      { title: "Говядина", quantity: "500", measurement: "г", available: true },
      { title: "Свекла", quantity: "2", measurement: "шт", available: true },
      { title: "Капуста", quantity: "300", measurement: "г", available: false },
      { title: "Картофель", quantity: "4", measurement: "шт", available: true },
      { title: "Морковь", quantity: "2", measurement: "шт", available: true },
      { title: "Лук", quantity: "1", measurement: "шт", available: true },
    ],
    matchScore: 33,
  },
  {
    id: "4",
    title: "Пицца Маргарита",
    description: "Классическая пицца с томатным соусом, моцареллой и базиликом",
    image:
      "https://static.1000.menu/img/content-v2/ef/27/10853/picca-margarita-v-domashnix-usloviyax_1769509858_1_bsgg32n_max.jpg",
    calories: 800,
    approximateTime: "40 минут",
    components: [
      { title: "Тесто", quantity: "1", measurement: "шт", available: true },
      {
        title: "Томатный соус",
        quantity: "150",
        measurement: "мл",
        available: true,
      },
      {
        title: "Моцарелла",
        quantity: "200",
        measurement: "г",
        available: false,
      },
      {
        title: "Базилик",
        quantity: "5",
        measurement: "листиков",
        available: true,
      },
      {
        title: "Оливковое масло",
        quantity: "2",
        measurement: "ст.л.",
        available: true,
      },
    ],
    matchScore: 98,
  },
  {
    id: "5",
    title: "Суши роллы",
    description: "Японские роллы с лососем, авокадо и рисом",
    image:
      "https://www.russianfood.com/dycontent/images_upl/282/big_281847.jpg",
    calories: 350,
    approximateTime: "45 минут",
    components: [
      {
        title: "Рис для суши",
        quantity: "300",
        measurement: "г",
        available: true,
      },
      { title: "Нори", quantity: "5", measurement: "листов", available: true },
      { title: "Лосось", quantity: "200", measurement: "г", available: false },
      { title: "Авокадо", quantity: "1", measurement: "шт", available: true },
      { title: "Огурец", quantity: "1", measurement: "шт", available: true },
      {
        title: "Соевый соус",
        quantity: "50",
        measurement: "мл",
        available: true,
      },
    ],
    matchScore: 89,
  },
  {
    id: "6",
    title: "Панкейки",
    description: "Пышные американские блинчики с кленовым сиропом",
    image:
      "https://img.iamcook.ru/2020/upl/recipes/cat/u-418c8f3bcc82b00de34d8d0de0c5a524.JPG",
    calories: 450,
    approximateTime: "15 минут",
    components: [
      { title: "Мука", quantity: "200", measurement: "г", available: true },
      { title: "Молоко", quantity: "250", measurement: "мл", available: true },
      { title: "Яйца", quantity: "2", measurement: "шт", available: true },
      {
        title: "Разрыхлитель",
        quantity: "1",
        measurement: "ч.л.",
        available: true,
      },
      {
        title: "Кленовый сироп",
        quantity: "50",
        measurement: "мл",
        available: false,
      },
      { title: "Масло", quantity: "20", measurement: "г", available: true },
    ],
    matchScore: 90,
  },
  {
    id: "7",
    title: "Греческий салат",
    description: "Средиземноморский салат с фетой и оливками",
    image: "https://ist.say7.info/img0014/76/1476_0182krx_2770_1024.jpg",
    calories: 280,
    approximateTime: "10 минут",
    components: [
      { title: "Помидоры", quantity: "3", measurement: "шт", available: true },
      { title: "Огурцы", quantity: "2", measurement: "шт", available: true },
      { title: "Фета", quantity: "150", measurement: "г", available: false },
      { title: "Оливки", quantity: "100", measurement: "г", available: true },
      {
        title: "Красный лук",
        quantity: "1",
        measurement: "шт",
        available: true,
      },
      {
        title: "Оливковое масло",
        quantity: "3",
        measurement: "ст.л.",
        available: true,
      },
    ],
    matchScore: 78,
  },
  {
    id: "8",
    title: "Куриное карри",
    description: "Ароматное индийское блюдо с курицей в пряном соусе",
    image:
      "https://images.gastronom.ru/58Vy20jaPZ31gTGg9x0cVgwFwHMltRsxMywhrQ9eqcA/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzdlNzE2Y2FhLTZkYjAtNGM3NC1iNTEwLTU2Yzk1MjFiYTBhZC5qcGc.webp",
    calories: 520,
    approximateTime: "35 минут",
    components: [
      {
        title: "Куриное филе",
        quantity: "400",
        measurement: "г",
        available: true,
      },
      {
        title: "Кокосовое молоко",
        quantity: "400",
        measurement: "мл",
        available: false,
      },
      { title: "Карри", quantity: "2", measurement: "ст.л.", available: true },
      { title: "Лук", quantity: "1", measurement: "шт", available: true },
      {
        title: "Чеснок",
        quantity: "3",
        measurement: "зубчика",
        available: true,
      },
      { title: "Имбирь", quantity: "2", measurement: "см", available: false },
      { title: "Рис", quantity: "200", measurement: "г", available: true },
    ],
    matchScore: 100,
  },
  {
    id: "9",
    title: "Блинчики с творогом",
    description: "Нежные блины с сладкой творожной начинкой",
    image:
      "https://zira.uz/wp-content/uploads/2020/03/blinchiki-s-tvorogom-6.jpg",
    calories: 380,
    approximateTime: "30 минут",
    components: [
      { title: "Мука", quantity: "150", measurement: "г", available: true },
      { title: "Молоко", quantity: "300", measurement: "мл", available: true },
      { title: "Яйца", quantity: "2", measurement: "шт", available: true },
      { title: "Творог", quantity: "300", measurement: "г", available: false },
      { title: "Сахар", quantity: "3", measurement: "ст.л.", available: true },
      { title: "Ваниль", quantity: "1", measurement: "ч.л.", available: true },
      { title: "Масло", quantity: "30", measurement: "г", available: true },
    ],
    matchScore: 76,
  },
  {
    id: "10",
    title: "Стейк с овощами",
    description: "Сочный говяжий стейк с запеченными овощами",
    image:
      "https://vkusvill.ru/upload/resize/186126/steyk-s-ovoshchami-gril_588x409x90_c.webp",
    calories: 720,
    approximateTime: "40 минут",
    components: [
      {
        title: "Говяжий стейк",
        quantity: "400",
        measurement: "г",
        available: true,
      },
      { title: "Брокколи", quantity: "200", measurement: "г", available: true },
      { title: "Перец", quantity: "2", measurement: "шт", available: false },
      { title: "Цукини", quantity: "1", measurement: "шт", available: true },
      {
        title: "Чеснок",
        quantity: "2",
        measurement: "зубчика",
        available: true,
      },
      {
        title: "Розмарин",
        quantity: "2",
        measurement: "веточки",
        available: true,
      },
    ],
    matchScore: 68,
  },
];

export const recipesApi = {
  getList: async (): Promise<GetRecipesListResponse> => {
    // return await apiClient.get(INGREDIENTS_ENDPOINTS.getLast);
    return Promise.resolve({
      recipesNumber: mockRecipes.length,
      recipes: mockRecipes,
    });
    // return Promise.resolve({
    //   recipesNumber: 0,
    //   recipes: [],
    // });
  },
  getSearchHistory: async () => {
    return apiClient.get(RECIPES_ENDPOINTS.searchHistory);
  },
};
