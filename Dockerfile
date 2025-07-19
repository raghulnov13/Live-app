# ----------------------
# Base Image
# ----------------------
FROM node:18-slim

# Install required system packages
RUN apt-get update && apt-get install -y \
    libaio1 unzip wget build-essential curl \
    && rm -rf /var/lib/apt/lists/*

# ----------------------
# Install Oracle Instant Client
# ----------------------
WORKDIR /opt/oracle

# Download Instant Client Basic Lite (23.8)
RUN wget https://download.oracle.com/otn_software/linux/instantclient/238000/instantclient-basiclite-linux.x64-23.8.0.24.09.zip \
    && unzip instantclient-basiclite-linux.x64-23.8.0.24.09.zip \
    && rm instantclient-basiclite-linux.x64-23.8.0.24.09.zip

# Set environment variables for Oracle Client
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_23_8
ENV PATH=$LD_LIBRARY_PATH:$PATH

# ----------------------
# App Setup
# ----------------------
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# ----------------------
# Expose Port
# ----------------------
EXPOSE 5000

# ----------------------
# Start Command
# ----------------------
CMD ["npm", "start"]
