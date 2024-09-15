# Bun 10K Tweets

This project sets up a server that utilizes clustering for multi-core processing, serving a React application that displays tweets from an SQLite database.

## Setup and Installation

### Setting up Bun

To run the Bun server, you need to have Bun installed on your system. You can download and install Bun from the official Bun website: https://bun.sh/docs/installation

Alternatively, you can run the following script to install Bun:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installing Project Dependencies

Before running any script, ensure you have installed the project dependencies using the following command:

```bash
bun install
```

## Usage

### Create Database

Before running the Bun server, ensure you have created the database file using the following command:

```bash
bun db
```

This command will create an SQLite database file `database.sqlite` and seed it with 10,000 tweets.

### Run Server

To run a server, navigate to the project directory in your terminal and execute:

```bash
bun start
```

### Workload Test

To perform a workload test using wrk, run the following command: `wrk -t12 -c400 -d15s http://localhost:3000`