-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 16 2022 г., 15:31
-- Версия сервера: 8.0.24
-- Версия PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ardi_local`
--

-- --------------------------------------------------------


--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `mobile`, `pic`) VALUES
(1, 'admin', 'v.korako@gmail.com', NULL, '$2y$10$p5w9/NlEctFqCwWm6.M1oOFxU/HV.j8Dxwqfyq9sPMDuN52duG12q', NULL, '2022-04-22 10:22:36', '2022-04-22 10:22:36', '+43006331122', './assets/media/avatars/300-01.jpg'),
(4, 'Анна Лебедева', 'annnn@gmail.com', NULL, '$2y$10$.Al5WA31rrlRmdhCZ6OrMuQVA1x4b4m/B3hcrDEoxw3V2wxfSJ5w.', NULL, '2022-04-22 11:26:34', '2022-04-22 11:26:34', '+43006331122', NULL),
(5, 'Вадим Гребенюк', 'greben@gmail.com', NULL, '$2y$10$YnmN.FWuvriAVBPC.5s9ve52iSWnSqPRuob4ei4GuTZt6r.kq93jW', NULL, '2022-04-22 11:27:53', '2022-04-22 11:27:53', '+43006331122', NULL),
(12, 'Иван Иванов', 'v.korako12@gmail.com', NULL, '$2y$10$GQ/6rqmT9SMNITIZzxwQP.Z3SIviRVtM53kJafF7ItsbfgeqHYHze', NULL, '2022-04-27 14:17:10', '2022-04-27 14:17:10', '+43006331122', NULL),
(14, 'Олег Олегович Григорий', 'olega123@gmail.com', NULL, '$2y$10$zJ.KhsU3yMJxZyVnkBeBgO4lfUFa2hRUy0TJy1keQVFID0YoR1Cja', NULL, '2022-05-09 16:28:02', '2022-05-09 16:28:02', '+43006331122', NULL),
(17, 'Евгений', 'jack@gmail.com', NULL, '$2y$10$ksExJ3hZTLEHw0/apgg6A.mHtQ4/aEfLnVd.5hCnkjQu1.UeFhwfO', NULL, '2022-06-09 16:47:27', '2022-06-09 16:47:27', '+43006331122', NULL),
(18, 'Наташа', 'natali@mail.ua', NULL, '$2y$10$0uePwq5nXSy17DlCBy4wseUhvkM/BuuOKauX94uisa8KayJjPf0c2', NULL, '2022-06-09 16:49:11', '2022-06-09 16:49:11', '+43006331122', NULL),
(19, 'Игорь', 'igor@gmail.com', NULL, '$2y$10$.ErawR1SjNrh27MsVlRinOenTP8Ay7onD.zk5RMwJWQiETdnW6aC6', NULL, '2022-06-09 16:50:07', '2022-06-09 16:50:07', '+43006331122', NULL),
(21, 'Колясик', 'kolik@mail.ua', NULL, '$2y$10$l8nFAl5h1okEvUG6sOC5feWCiPKmNnYCXrfV8pTuOkg2YBWrQRKUi', NULL, '2022-06-10 15:31:36', '2022-06-10 15:31:36', '+43006331122', NULL),
(22, 'Анастасия Гуляева', 'gylaeva@gmail.com', NULL, '$2y$10$AoZIn2R1c5opNOfGGHGfIu6U55GGPy/6Q7U7otj4c9W8o/l2lm.1q', NULL, '2022-06-10 15:34:52', '2022-06-10 15:34:52', '+380665558877', NULL),
(23, 'vasya', 'vasya@mail.com', NULL, '$2y$10$hwSNlAm.Bz/WY0yy6.Pdo.ENwwExoX.ChUALwlswODwv8s5st82pO', NULL, '2022-07-04 15:57:56', '2022-07-04 15:57:56', '+43006331122', NULL),
(26, 'Олег Петров', 'petrov@gmail.com', NULL, '$2y$10$De4Grdg7o2kkL7NVmsiKG.GlTX6lCpsebANFsbAhhUzVeszt46qo.', NULL, '2022-07-11 09:34:16', '2022-07-11 09:34:16', '21424235', NULL),
(28, 'Гундяк Анатолий', 'anatolich@mail.com', NULL, '$2y$10$vsCXJOd0qWAouI78O5dW9uJkE3Koj5pgM0hwCyaYiD5AMo9tYGNFm', NULL, '2022-07-11 09:45:33', '2022-07-11 09:45:33', '+34556783467', NULL),
(32, 'Манулкина Анна', 'manulka@mail.ua', NULL, '$2y$10$WfJ/M3ocmCIIomjHkuIkL.TTa6zMQqUCobK91IJ9exQAwhSyIofOK', NULL, '2022-07-11 11:45:52', '2022-07-11 11:45:52', '2353253456', NULL),
(33, 'Олежа', 'olegka12@mail.com', NULL, '$2y$10$MlG2mvrmpXEhaskzpKwmGugJra8AxJibekbfH8tpCo38dxFJ1XJA2', NULL, '2022-07-15 07:35:25', '2022-07-15 07:35:25', '12214214214', NULL),
(34, 'test user', 'qwe@qwe.qwe', NULL, '$2y$10$pXC0GiTMcQD2lrC8mOrqxeY7siv7rEdlOVL3LdNZdXEsQ8kuMKZCu', NULL, '2022-07-16 10:12:29', '2022-07-16 10:12:29', NULL, NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
