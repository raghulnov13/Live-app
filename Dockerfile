# Use Node.js 18
FROM node:18-bullseye

# Install required tools
RUN apt-get update && apt-get install -y wget unzip libaio1 && rm -rf /var/lib/apt/lists/*

# Download and install Oracle Instant Client 23.8 Basic Lite
WORKDIR /opt/oracle
RUN wget https://download.oracle.com/otn_software/linux/instantclient/238000/instantclient-basiclite-linux.x64-23.8.0.24.0dbru.zip \
    && unzip instantclient-basiclite-linux.x64-23.8.0.24.0dbru.zip \
    && rm instantclient-basiclite-linux.x64-23.8.0.24.0dbru.zip \
    && echo /opt/oracle/instantclient_23_8 > /etc/ld.so.conf.d/oracle-instantclient.conf \
    && ldconfig

# Set environment variables for Oracle
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_23_8:$LD_LIBRARY_PATH
ENV PATH=/opt/oracle/instantclient_23_8:$PATH

# Copy project files
WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
