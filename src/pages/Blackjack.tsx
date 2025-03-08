
import { useState } from "react";
import { Card as UICard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Card {
  suit: string;
  value: string;
  numericValue: number;
}

const BlackjackPage = () => {
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'dealerTurn' | 'gameOver'>('idle');
  const [result, setResult] = useState<'win' | 'lose' | 'push' | null>(null);
  
  const suits = ["♠️", "♥️", "♦️", "♣️"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  
  const getNumericValue = (value: string): number => {
    if (value === "A") return 11;
    if (["J", "Q", "K"].includes(value)) return 10;
    return parseInt(value);
  };
  
  const createDeck = (): Card[] => {
    const deck: Card[] = [];
    for (const suit of suits) {
      for (const value of values) {
        deck.push({
          suit,
          value,
          numericValue: getNumericValue(value)
        });
      }
    }
    return shuffleDeck(deck);
  };
  
  const shuffleDeck = (deck: Card[]): Card[] => {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
  };
  
  const drawCard = (deck: Card[]): [Card, Card[]] => {
    const card = deck[0];
    const remainingDeck = deck.slice(1);
    return [card, remainingDeck];
  };
  
  const calculateHandValue = (hand: Card[]): number => {
    let value = hand.reduce((sum, card) => sum + card.numericValue, 0);
    let aces = hand.filter(card => card.value === "A").length;
    
    // Adjust for aces
    while (value > 21 && aces > 0) {
      value -= 10; // Convert an Ace from 11 to 1
      aces--;
    }
    
    return value;
  };
  
  const startGame = () => {
    const deck = createDeck();
    
    // Draw two cards for player
    const [playerCard1, deck1] = drawCard(deck);
    const [playerCard2, deck2] = drawCard(deck1);
    
    // Draw two cards for dealer
    const [dealerCard1, deck3] = drawCard(deck2);
    const [dealerCard2, _] = drawCard(deck3);
    
    setPlayerHand([playerCard1, playerCard2]);
    setDealerHand([dealerCard1, dealerCard2]);
    setGameState('playing');
    setResult(null);
  };
  
  const hit = () => {
    if (gameState !== 'playing') return;
    
    const deck = createDeck();
    const [newCard, _] = drawCard(deck);
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    
    const handValue = calculateHandValue(newHand);
    if (handValue > 21) {
      setGameState('gameOver');
      setResult('lose');
    }
  };
  
  const stand = () => {
    if (gameState !== 'playing') return;
    
    setGameState('dealerTurn');
    
    // Dealer draws until 17 or higher
    let currentDealerHand = [...dealerHand];
    let currentDealerValue = calculateHandValue(currentDealerHand);
    
    const dealerPlay = () => {
      if (currentDealerValue < 17) {
        const deck = createDeck();
        const [newCard, _] = drawCard(deck);
        currentDealerHand = [...currentDealerHand, newCard];
        setDealerHand(currentDealerHand);
        currentDealerValue = calculateHandValue(currentDealerHand);
        
        setTimeout(dealerPlay, 1000);
      } else {
        const playerValue = calculateHandValue(playerHand);
        
        setGameState('gameOver');
        
        if (currentDealerValue > 21) {
          setResult('win');
        } else if (playerValue > currentDealerValue) {
          setResult('win');
        } else if (playerValue < currentDealerValue) {
          setResult('lose');
        } else {
          setResult('push');
        }
      }
    };
    
    dealerPlay();
  };
  
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Crypto Blackjack
        </h1>
        <p className="text-white/80 mb-6 max-w-3xl">
          Get as close to 21 as possible without going over. Beat the dealer to win!
        </p>
        
        <UICard className="bg-winfinity-blue/20 border-winfinity-cyan/20 overflow-hidden p-6">
          {gameState === 'idle' ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Play?</h2>
              <Button 
                className="bg-gradient-to-r from-winfinity-cyan to-winfinity-blue text-white button-shine px-8 py-6 text-lg"
                onClick={startGame}
              >
                Deal Cards
              </Button>
            </div>
          ) : (
            <div>
              {/* Dealer's Hand */}
              <div className="mb-8">
                <h3 className="text-white mb-2">Dealer's Hand: {gameState !== 'idle' && gameState !== 'playing' ? calculateHandValue(dealerHand) : '?'}</h3>
                <div className="flex gap-2">
                  {dealerHand.map((card, index) => (
                    <div 
                      key={index} 
                      className={`w-16 h-24 bg-white rounded-md flex items-center justify-center font-bold ${card.suit === "♥️" || card.suit === "♦️" ? "text-red-600" : "text-black"}`}
                      style={{ 
                        visibility: index === 1 && gameState === 'playing' ? 'hidden' : 'visible',
                        opacity: index === 1 && gameState === 'playing' ? 0 : 1
                      }}
                    >
                      <div>
                        <div>{card.value}</div>
                        <div>{card.suit}</div>
                      </div>
                    </div>
                  ))}
                  {gameState === 'playing' && (
                    <div className="w-16 h-24 bg-winfinity-darker-blue rounded-md flex items-center justify-center border-2 border-winfinity-cyan">
                      <span className="text-2xl">?</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Player's Hand */}
              <div className="mb-8">
                <h3 className="text-white mb-2">Your Hand: {calculateHandValue(playerHand)}</h3>
                <div className="flex gap-2 flex-wrap">
                  {playerHand.map((card, index) => (
                    <div 
                      key={index} 
                      className={`w-16 h-24 bg-white rounded-md flex items-center justify-center font-bold ${card.suit === "♥️" || card.suit === "♦️" ? "text-red-600" : "text-black"}`}
                    >
                      <div>
                        <div>{card.value}</div>
                        <div>{card.suit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Game Result */}
              {gameState === 'gameOver' && (
                <div className={`text-center my-4 p-3 rounded-lg ${
                  result === 'win' ? 'bg-green-500/20 text-green-400' : 
                  result === 'lose' ? 'bg-red-500/20 text-red-400' : 
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <h3 className="text-xl font-bold">
                    {result === 'win' ? 'You Win!' : 
                     result === 'lose' ? 'Dealer Wins' : 
                     'Push - Tie Game'}
                  </h3>
                  <p className="mt-2">
                    Your hand: {calculateHandValue(playerHand)} | 
                    Dealer's hand: {calculateHandValue(dealerHand)}
                  </p>
                </div>
              )}
              
              {/* Game Controls */}
              <div className="flex justify-center gap-4 mt-4">
                {gameState === 'playing' && (
                  <>
                    <Button 
                      className="bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90"
                      onClick={hit}
                    >
                      Hit
                    </Button>
                    <Button 
                      className="bg-winfinity-purple text-white hover:bg-winfinity-purple/90"
                      onClick={stand}
                    >
                      Stand
                    </Button>
                  </>
                )}
                
                {gameState === 'gameOver' && (
                  <Button 
                    className="bg-gradient-to-r from-winfinity-cyan to-winfinity-blue text-white button-shine"
                    onClick={startGame}
                  >
                    Play Again
                  </Button>
                )}
              </div>
            </div>
          )}
        </UICard>
      </div>
      
      <UICard className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Blackjack Rules</h2>
        <div className="text-white/80 space-y-2">
          <p>• The goal is to have a hand value closer to 21 than the dealer without exceeding 21.</p>
          <p>• Number cards are worth their face value, face cards (J, Q, K) are worth 10, and Aces can be worth 1 or 11.</p>
          <p>• The dealer must hit until their hand is worth at least 17.</p>
          <p>• If you exceed 21, you "bust" and lose automatically.</p>
          <p>• If the dealer busts, you win.</p>
          <p>• If neither busts, the higher hand wins. Equal values result in a push (tie).</p>
        </div>
      </UICard>
    </div>
  );
};

export default BlackjackPage;
