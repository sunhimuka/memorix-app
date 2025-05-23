import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from 'lucide-react';

export default function WhisperMemoryApp() {
  const [memoryPrompt, setMemoryPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generateMemory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: memoryPrompt }),
      });
      const data = await response.json();
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      } else {
        setError("記憶の生成に失敗しました。");
      }
    } catch (e) {
      setError("サーバーエラーが発生しました。");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg p-6 shadow-2xl rounded-2xl">
        <CardContent className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-center">WhisperMemory｜1ドルの忘却ボイス</h1>
          <Textarea
            value={memoryPrompt}
            onChange={(e) => setMemoryPrompt(e.target.value)}
            placeholder="忘れたい、でも忘れたくない記憶を、少しだけ書いてください..."
            className="resize-none min-h-[100px]"
          />
          <Button onClick={handleGenerate} disabled={isLoading || !memoryPrompt}>
            {isLoading ? <Loader2 className="animate-spin" /> : "1ドルで記憶を蘇らせる"}
          </Button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {audioUrl && (
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              あなたのブラウザはaudio再生に対応していません。
            </audio>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
