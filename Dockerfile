# Используем базовый образ Node.js на основе alpine
FROM node:14-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию
COPY . .

# Определение порта, на котором будет работать приложение
EXPOSE 80

# Команда для запуска приложения внутри контейнера
CMD ["npm", "run", "start"]