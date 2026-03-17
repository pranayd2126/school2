import React, { useState } from 'react';
import { mockMessages } from '../db';
import { Search, Send, User, Clock, MessageSquare, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function StudentMessages() {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Group messages by teacher
  const conversations = mockMessages.reduce((acc, curr) => {
    const otherParty = curr.senderId === 'student_1' ? curr.receiverId : curr.senderId;
    const otherName = curr.senderName === 'Student User' ? 'Teacher' : curr.senderName;
    
    if (!acc[otherParty]) {
      acc[otherParty] = {
        id: otherParty,
        name: otherName,
        messages: [],
        unread: 0
      };
    }
    acc[otherParty].messages.push(curr);
    if (!curr.read && curr.receiverId === 'student_1') {
      acc[otherParty].unread++;
    }
    return acc;
  }, {} as Record<string, any>);

  const conversationList = Object.values(conversations);
  const activeConversation = selectedTeacher ? conversations[selectedTeacher] : null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedTeacher) return;
    // In a real app, send to backend. Here we just clear the input.
    setMessageInput('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] flex flex-col md:flex-row gap-6 pb-8">
      {/* Sidebar - Conversations List */}
      <div className={`w-full md:w-80 lg:w-96 flex flex-col bg-card rounded-[2rem] border border-border shadow-sm overflow-hidden ${selectedTeacher ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-border bg-gradient-to-b from-secondary/50 to-transparent">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="font-display font-bold text-2xl m-0">Messages</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search teachers..." 
              className="w-full bg-background border border-border rounded-full pl-11 pr-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-shadow"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide">
          {conversationList.map((conv, i) => {
            const lastMessage = conv.messages[conv.messages.length - 1];
            const isSelected = selectedTeacher === conv.id;
            return (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={conv.id}
                onClick={() => setSelectedTeacher(conv.id)}
                className={`w-full text-left p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 group ${
                  isSelected 
                    ? 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-blue-500/20 shadow-sm' 
                    : 'hover:bg-secondary/50 border-transparent hover:border-border/50'
                } border`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-display font-bold text-lg shadow-inner transition-colors ${
                  isSelected ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white' : 'bg-secondary text-secondary-foreground group-hover:bg-primary/10 group-hover:text-primary'
                }`}>
                  {conv.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`font-bold text-sm truncate pr-2 ${isSelected ? 'text-primary' : 'text-foreground'}`}>{conv.name}</h3>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">
                      {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={`text-xs truncate font-medium ${conv.unread > 0 ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                    {lastMessage.content}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 mt-1">
                    {conv.unread}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col bg-card rounded-[2rem] border border-border shadow-sm overflow-hidden relative ${!selectedTeacher ? 'hidden md:flex' : 'flex'}`}>
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 sm:p-6 border-b border-border flex items-center gap-4 bg-gradient-to-r from-secondary/30 to-transparent backdrop-blur-md relative z-10">
              <button 
                className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                onClick={() => setSelectedTeacher(null)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-display font-bold text-lg shadow-inner">
                {activeConversation.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-display font-bold text-lg leading-tight">{activeConversation.name}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-success"></span>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Teacher • Online</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-secondary/10 relative">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              
              {activeConversation.messages.map((msg: any, index: number) => {
                const isMe = msg.senderId === 'student_1';
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    key={msg.id} 
                    className={`flex flex-col relative z-10 ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl shadow-sm ${
                      isMe 
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-sm shadow-blue-500/20' 
                        : 'bg-card border border-border text-foreground rounded-tl-sm'
                    }`}>
                      <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6 border-t border-border bg-card relative z-10">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-secondary/50 border border-border rounded-full px-6 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-inner transition-shadow"
                />
                <button 
                  type="submit" 
                  disabled={!messageInput.trim()}
                  className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5 ml-1" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 rounded-[2rem] bg-secondary/80 flex items-center justify-center mb-6 shadow-inner relative z-10 border border-border/50"
            >
              <MessageSquare className="w-10 h-10 opacity-40" />
            </motion.div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-3 relative z-10">Your Messages</h3>
            <p className="text-sm font-medium max-w-xs relative z-10 leading-relaxed">Select a teacher from the sidebar to view your conversation history or start a new message.</p>
          </div>
        )}
      </div>
    </div>
  );
}
