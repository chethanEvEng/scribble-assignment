import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { GuessForm } from "../components/GuessForm";
import { ResultPanel } from "../components/ResultPanel";
import { RoomCodeBadge } from "../components/RoomCodeBadge";
import { Scoreboard } from "../components/Scoreboard";
import { Canvas } from "../components/Canvas";
import { useRoomState, useRoomStore } from "../state/roomStore";
import { api } from "../services/api";

export function GamePage() {
  const navigate = useNavigate();
  const { room, participantId } = useRoomState();
  const store = useRoomStore();

  useEffect(() => {
    if (!room) {
      navigate("/", { replace: true });
    } else {
      store.startPolling();
    }
    return () => store.stopPolling();
  }, [navigate, room, store]);

  if (!room) {
    return null;
  }

  const viewer = room.participants.find((participant) => participant.id === participantId) ?? null;
  const currentDrawer = api.getCurrentDrawer(room);

  const handleGuessSubmit = async (guess: string) => {
    if (room && participantId) {
        await api.submitGuess(room.code, participantId, guess);
        store.fetchRoom();
    }
  };

  const handleCanvasDraw = async (data: any) => {
      if (room && participantId && viewer?.isDrawer) {
          await store.updateCanvas(data);
      }
  }

  const handleCanvasClear = async () => {
    if (room && participantId && viewer?.isDrawer) {
        await store.updateCanvas(null);
        store.fetchRoom();
    }
  }

  return (
    <section className="panel game-page">
      <div className="game-page__header">
        <div className="game-page__header-left">
          <span className="section-kicker">Round 1</span>
          <h1 className="game-page__title">Guess the Word!</h1>
        </div>
        <RoomCodeBadge code={room.code} />
      </div>

      <div className="game-page__layout">
        <aside className="game-page__sidebar game-page__sidebar--left">
          <Scoreboard scoreboard={room.scoreboard} participants={room.participants} />
          <ResultPanel guessHistory={room.guessHistory} participants={room.participants} />
        </aside>

        <div className="game-page__main">
          <Canvas 
            isDrawer={viewer?.isDrawer ?? false} 
            drawerName={currentDrawer?.name}
            onDraw={handleCanvasDraw}
            onClear={handleCanvasClear}
            initialData={room.canvasData}
          />
        </div>

        <aside className="game-page__sidebar game-page__sidebar--right">
          {viewer?.isDrawer ? (
            <Card title="Secret Word">
              <p className="secret-word" style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                {room.currentWord}
              </p>
            </Card>
          ) : (
            <Card title="Your Guess">
              <GuessForm onSubmit={handleGuessSubmit} disabled={room.status === 'ended'} />
            </Card>
          )}
          <Card title="Player Info">
            <dl className="detail-list">
              <div>
                <dt>Name</dt>
                <dd>{viewer?.name ?? "Unknown player"}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Playing</dd>
              </div>
            </dl>
          </Card>
        </aside>
      </div>

      <div className="button-row">
        <button className="button button--secondary" onClick={() => navigate("/lobby")}>
          Exit Game
        </button>
      </div>
    </section>
  );
}
