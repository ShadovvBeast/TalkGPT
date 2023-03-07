# TalkGPT

TalkGPT allows you to easily interact with ChatGPT, the state-of-the-art language model developed by OpenAI. With TalkGPT, you can talk to ChatGPT naturally, with your voice, and it will answer with a voice as well!

## Prerequisites

In order to use TalkGPT, you will need to have the following installed on your system:

- Node.js
- yarn

## Installation

To install TalkGPT, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/ShadovvBeast/TalkGPT
    ```

2. Navigate to the directory where you cloned the repository:

    ```
    cd TalkGPT
    ```

3. Install the required dependencies:

    ```
    yarn
    cd frontend
    yarn
    ```
4. Set up the env vars required by one of the underlying packages:
   * Official API by providing the OPENAI_API_KEY env var.
   * Unofficial API proxy by providing the OPENAI_ACCESS_TOKEN env var) 
5. Make sure the frontend has a .env file with the VITE_BACKEND_URL=http://localhost:3001 env var set
6. You are now ready to use TalkGPT!

## Usage

To use TalkGPT, run the following commands in your one terminal:

    yarn build
    yarn start

This will start the TalkGPT server, then in another terminal run:

    cd frontend
    yarn dev
    
This will start client (running on Vite)

Now you can talk to chatgpt!

## Contributing

We welcome contributions to TalkGPT! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.

We will review your changes and, if everything looks good, merge them into the main branch of the repository.

Thank you for considering contributing to TalkGPT!
