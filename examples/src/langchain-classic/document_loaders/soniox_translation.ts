import { SonioxAudioTranscriptLoader } from "@langchain/community/document_loaders/web/soniox";

const audioUrl =
  "https://github.com/soniox/soniox_examples/raw/refs/heads/master/speech_to_text/assets/two_way_translation.mp3";

const res = await fetch(audioUrl);
const audio = await res.bytes();

const loader = new SonioxAudioTranscriptLoader(
  {
    audio: audio,
    audioFormat: "mp3",
    apiKey: "<SONIOX_API_KEY>", // or set the `SONIOX_API_KEY` env variable
  },
  {
    model: "stt-async-v3",
    // Enable translation by adding a translation config
    translation: {
      type: "one_way",
      target_language: "fr",
    },
    // any other parameters as documented here: https://soniox.com/docs/stt/api-reference/transcriptions/create_transcription
  }
);

const docs = await loader.load();
console.dir(docs, { depth: Infinity });
