# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12.16.1
WORKDIR /server
COPY package*.json /server/
# install dependencies
RUN npm install
COPY . /server/
ENV DOCKER=true
EXPOSE 3001
# Run the app when the container launches
CMD ["npm", "start"]
