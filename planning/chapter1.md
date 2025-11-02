Introduction to AI, Machine Learning, and LLM Concepts

1. Core Concepts

Artificial Intelligence (AI)

Definition: Artificial Intelligence is the broad, overarching field of computer science focused on creating systems and machines that can simulate human intelligence to perform tasks. This includes abilities like problem-solving, learning, planning, decision-making, and understanding human language. It is the "umbrella" that covers all other concepts on this list, from simple rule-based systems to complex models like LLMs.

Machine Learning (ML)

Definition: Machine Learning is a specific subfield of AI where systems are not explicitly programmed with rules. Instead, they "learn" directly from large amounts of data. The system identifies statistical patterns within the data to make predictions, classifications, or decisions. For example, a spam filter "learns" to identify junk email by analyzing thousands of examples. This data-driven approach is the engine behind most modern AI.

Generative AI

Definition: Generative AI is a subfield of Machine Learning that focuses on creating new, original content rather than just predicting a label or value. These models learn the underlying patterns and structure of a dataset (like text, images, or music) and can then "generate" novel outputs that are similar to, but not identical to, the data they were trained on. LLMs are a primary example of Generative AI.

2. LLM Fundamentals

LLM (Large Language Model)

Definition: A Large Language Model (LLM) is a type of Generative AI model specifically designed to understand, generate, and interact with human-like text. These models are "large" because they are trained on massive datasets of text and code, containing billions or even trillions of parameters. This extensive pretraining allows them to learn complex patterns, grammar, and even reasoning abilities, making them general-purpose tools that can be adapted to a wide range of tasks. Many modern LLMs are also multimodal, meaning they can process and integrate information from other modalities like images or audio.

Foundation Model

Definition: A Foundation Model is a large-scale AI model (like an LLM) trained on a massive, broad dataset. It is so named because it serves as a broad "foundation" for more specialized tasks. This pretraining captures a general "understanding" of the data (like grammar, facts, or visual patterns), which can then be adapted (e.g., through fine-tuning) to a wide variety of "downstream" tasks like sentiment analysis or medical image diagnosis.

Transformer

Definition: The Transformer is a neural network architecture that serves as the foundational technology for most modern LLMs, including models like GPT and Claude. Introduced in the 2017 paper "Attention Is All You Need," its key innovation is the "attention mechanism," which allows the model to weigh the importance of different words (tokens) in a sequence, regardless of their distance from each other. This was a major breakthrough, as previous methods struggled to capture long-range context. The Transformer's design is also highly parallelizable, which enabled the "scaling laws" that allow models to improve predictably as their size and training data increase.

Token

Definition: A token is the fundamental unit of text that an LLM processes. Instead of processing text letter by letter or word by word, LLMs use a "tokenizer" to break down text into these pieces, which can be whole words (e.g., "hello"), subwords (e.g., "run" and "ning" for "running"), or even individual characters. This method, often using techniques like Byte-Pair Encoding (BPE), efficiently handles a large vocabulary. The "token" serves as the fundamental unit of measurement for both billing and the model's context window.

Embedding

Definition: An embedding is a numerical, multi-dimensional vector representation of a piece of data, such as a token or word. This vector is not just a random ID; it's learned during training to capture the semantic meaning and context of the data. Words with similar meanings or that are used in similar contexts will have embeddings that are "close" to each other in this high-dimensional vector space. This space can capture complex semantic relationships (famously, King - Man + Woman ≈ Queen). This concept is what allows LLMs to understand nuanced relationships between words and is the core of semantic search.

Semantic Similarity

Definition: Semantic similarity is the measure of how closely related two pieces of text are in meaning. This is calculated using their embeddings. The most common metric for this is "cosine similarity," which measures the angle between two vectors in that high-dimensional space. A score of 1 means the text is semantically identical, 0 means it's unrelated, and -1 means it's opposite.

Context Window

Definition: The context window represents the maximum amount of information (measured in tokens) that an LLM can "see" at one time. This includes both the input prompt from the user and the output completion generated by the model. For example, a model with an 8,000-token context window can process a combination of input and output up to that limit. If a conversation or document exceeds this limit, older information is "forgotten" or truncated. The size of the context window is a key architectural feature and a trade-off between capability and computational cost.

RAG (Retrieval-Augmented Generation)

Definition: Retrieval-Augmented Generation (RAG) is a powerful technique that connects a static, pre-trained LLM to an external, dynamic knowledge base. This process involves taking a user's query, "retrieving" relevant information from a knowledge base (often a vector store using semantic search), and then "augmenting" the original prompt by adding this retrieved information as context. The LLM then "generates" an answer based on both the original query and the fresh, retrieved data, allowing it to use up-to-date information, access private data, and provide citations, which significantly reduces hallucinations.

Knowledge Cutoff

Definition: The knowledge cutoff is the specific date that marks the end of an LLM's static training data. The model has no internal knowledge of any events, facts, or developments that occurred after this date. For example, the GPT-4o model has a knowledge cutoff of October 2023. This is a fundamental limitation of static pretraining. To provide more current information, LLMs must be augmented with external tools like RAG (e.g., web browsing).

Prompt

Definition: A prompt is the input text, instructions, or queries provided to an LLM to guide it toward a specific response or "completion." In many conversational APIs, this is split into two parts: a high-level "System Prompt" that defines the AI's persona and rules (e.g., "You are an expert copywriter") and a "User Prompt" that contains the specific, in-the-moment question (e.g., "Write a headline for this product"). The art of crafting effective prompts is known as prompt engineering.

Completion

Definition: The completion is the output text generated by an LLM after it processes a prompt. This is the model's "answer" or "response," and it is measured in "output tokens." In many applications, this text is "streamed" back to the user token by token, creating the effect of the model "typing" its response in real-time. This streaming performance is often measured in tokens per second (TPS).

Live / Stream Principle

Definition: This principle refers to the continuous, real-time flow of data (tokens) both to and from an LLM, which is essential for "live" interactions like natural-sounding conversations. Unlike a standard "completion" where you send one prompt and wait for one full response, streaming involves a persistent connection. This is most common in "Voice Interaction," where the user's speech is transcribed and sent to the model in real-time, and the model's generated text is streamed back and converted to speech (TTS) token by token. This "duplex" flow is critical for minimizing "latency."

Multimodality

Definition: Multimodality refers to the ability of a single AI model to understand, process, and generate information across different "modes" or types of data, such as text, images, and audio. While the first LLMs were focused only on plain text, this has changed in recent years as models have become natively multimodal. This is a key distinction: a true multimodal model is not just translating an image into a text description (or vice-versa) but is natively trained on data from multiple modes simultaneously. This allows it to understand deep, cross-modal relationships, such as explaining a complex diagram, answering a spoken question about a photo, or generating an image directly from a conversational prompt.