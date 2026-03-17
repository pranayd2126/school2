import React, { useState } from 'react';
import { Search, Send, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockMessages, mockUsers, Message } from '../db';
import { motion } from 'motion/react';

export function TeacherMessages() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const students = mockUsers.filter(u => u.role === 'student');
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = messages.filter(m => 
    (m.senderId === user?.id && m.receiverId === selectedStudent?.id) ||
    (m.senderId === selectedStudent?.id && m.receiverId === user?.id)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedStudent) return;

    const msg: Message = {
      id: `m${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      receiverId: selectedStudent.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="page-header mb-0 shrink-0">
        <h1>Messages</h1>
        <p>Communicate directly with your students.</p>
      </div>

      <div className="flex-1 card-elevated flex overflow-hidden">
        {/* Left Panel - Student List */}
        <div className="w-full sm:w-80 border-r border-border flex flex-col shrink-0 hidden sm:flex">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredStudents.map(student => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                  selectedStudent?.id === student.id 
                    ? 'bg-primary/10 border-l-2 border-primary' 
                    : 'hover:bg-secondary/50 border-l-2 border-transparent'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-info/10 text-info flex items-center justify-center font-bold shrink-0">
                  {student.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{student.name}</p>
                  <p className="text-xs text-muted-foreground truncate">Class {student.class}-{student.section}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div className="flex-1 flex flex-col bg-background/50">
          {selectedStudent ? (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-border flex items-center px-6 bg-card shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-info/10 text-info flex items-center justify-center font-bold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{selectedStudent.name}</h3>
                    <p className="text-xs text-muted-foreground">Class {selectedStudent.class}-{selectedStudent.section}</p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentConversation.length > 0 ? (
                  currentConversation.map((msg, i) => {
                    const isMe = msg.senderId === user?.id;
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id} 
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                          isMe 
                            ? 'bg-primary text-primary-foreground rounded-br-sm' 
                            : 'bg-secondary text-secondary-foreground rounded-bl-sm'
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 px-1">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <User className="w-12 h-12 mb-4 opacity-20" />
                    <p>No messages yet.</p>
                    <p className="text-sm">Start the conversation with {selectedStudent.name}.</p>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-card border-t border-border shrink-0">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-2 bg-secondary/50 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <MessageCircle className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium text-foreground">Select a conversation</p>
              <p className="text-sm">Choose a student from the list to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Need to import MessageCircle for empty state
import { MessageCircle } from 'lucide-react';
