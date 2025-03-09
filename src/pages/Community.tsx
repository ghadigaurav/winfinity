import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Trophy, ExternalLink, MessageSquare } from "lucide-react";

const CommunityPage = () => {
  const handleJoinDiscord = () => {
    window.open('https://discord.gg/ZnW3dJBMdt', '_blank');
  };
  
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Community Hub
        </h1>
        <p className="text-white/80 mb-6 max-w-3xl">
          Join our vibrant community of crypto enthusiasts and gamers to share strategies, participate in exclusive events, and win special rewards.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gradient-to-br from-[#5865F2]/20 to-winfinity-blue/20 border-[#5865F2]/30 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#5865F2]/20 flex items-center justify-center">
                  <MessageSquare size={28} className="text-[#5865F2]" />
                </div>
                <div className="px-3 py-1 bg-[#5865F2]/20 text-[#5865F2] rounded-full text-xs font-semibold">
                  Official
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Join Our Discord Server</h2>
              <p className="text-white/80 mb-6">
                Connect with other Winfinity players, get exclusive announcements, participate in community events, and receive direct support from our team.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={16} className="text-[#5865F2]" />
                  </div>
                  <p className="text-white/80">Real-time chat with community and team members</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0">
                    <Trophy size={16} className="text-[#5865F2]" />
                  </div>
                  <p className="text-white/80">Exclusive giveaways and tournament announcements</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0">
                    <Users size={16} className="text-[#5865F2]" />
                  </div>
                  <p className="text-white/80">Find friends and team up for multiplayer games</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-[#5865F2] hover:bg-[#5865F2]/90 text-white"
                onClick={handleJoinDiscord}
              >
                <MessageSquare className="mr-2" size={18} />
                Join Discord Server
                <ExternalLink className="ml-2" size={16} />
              </Button>
            </div>
            
            <div className="bg-[#5865F2]/10 p-4 border-t border-[#5865F2]/20">
              <div className="flex justify-between items-center">
                <div className="text-white/70 text-sm">Current members:</div>
                <div className="text-white font-semibold">3,541 online</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-winfinity-blue/10 border-winfinity-blue/30">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Community Events</h2>
            
            <div className="space-y-4">
              {[
                {
                  title: "Weekend Tournament",
                  description: "Join the big weekend tournament with a prize pool of 500 WINF",
                  date: "Every Saturday, 8PM UTC",
                  color: "bg-winfinity-cyan/20 text-winfinity-cyan"
                },
                {
                  title: "Community Call",
                  description: "Monthly call with the team to discuss upcoming features",
                  date: "First Monday of each month",
                  color: "bg-winfinity-purple/20 text-winfinity-purple"
                },
                {
                  title: "Trading Strategy Workshop",
                  description: "Learn winning strategies from pro players",
                  date: "Every other Thursday",
                  color: "bg-winfinity-pink/20 text-winfinity-pink"
                }
              ].map((event, index) => (
                <div key={index} className="bg-winfinity-blue/20 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs ${event.color}`}>
                      {event.date}
                    </div>
                  </div>
                  <p className="text-white/70 mt-2">{event.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90"
                onClick={handleJoinDiscord}
              >
                See All Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Community Leaderboard</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-winfinity-blue/20">
                  <th className="text-left py-3 px-4 text-winfinity-cyan">Rank</th>
                  <th className="text-left py-3 px-4 text-winfinity-cyan">Player</th>
                  <th className="text-center py-3 px-4 text-winfinity-cyan">Wins</th>
                  <th className="text-center py-3 px-4 text-winfinity-cyan">Total Wagered</th>
                  <th className="text-right py-3 px-4 text-winfinity-cyan">Profit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, player: "0x71C7...976F", wins: 342, wagered: "152.4 ETH", profit: "+32.8 ETH" },
                  { rank: 2, player: "0x7cB5...86A8", wins: 298, wagered: "143.2 ETH", profit: "+28.5 ETH" },
                  { rank: 3, player: "0x2546...EC30", wins: 267, wagered: "128.7 ETH", profit: "+24.2 ETH" },
                  { rank: 4, player: "0xbDA5...197E", wins: 245, wagered: "112.3 ETH", profit: "+19.8 ETH" },
                  { rank: 5, player: "0xdD2F...44C0", wins: 213, wagered: "98.6 ETH", profit: "+17.3 ETH" },
                ].map((player, index) => (
                  <tr key={index} className="border-b border-winfinity-blue/20 hover:bg-winfinity-blue/20">
                    <td className="py-3 px-4 text-white">{player.rank}</td>
                    <td className="py-3 px-4 text-white">{player.player}</td>
                    <td className="py-3 px-4 text-white text-center">{player.wins}</td>
                    <td className="py-3 px-4 text-white text-center">{player.wagered}</td>
                    <td className="py-3 px-4 text-winfinity-cyan text-right font-medium">{player.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityPage;
