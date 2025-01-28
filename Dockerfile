FROM node:18-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# EXPOSE 5173
# CMD ["npm", "run", "preview"]
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]