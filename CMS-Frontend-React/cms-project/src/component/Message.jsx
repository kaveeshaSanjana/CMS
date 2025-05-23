import { useState, useEffect } from 'react';
import { Search, Send, User, Check, CheckCheck, Clock, AlertCircle, X, ChevronLeft } from 'lucide-react';

export default function MessagesComponent() {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileConversation, setShowMobileConversation] = useState(false);

  // Fetch conversations data
  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock conversations data
        const conversationsData = [
          {
            id: 1,
            name: "Parent - Sarah Johnson",
            avatar: "SJ",
            lastMessage: "Thank you for the update on Tim's progress!",
            timestamp: "10:25 AM",
            unread: 2,
            type: "parent"
          },
          {
            id: 2,
            name: "Student - Michael Chen",
            avatar: "MC",
            lastMessage: "When is the next tutorial video coming out?",
            timestamp: "Yesterday",
            unread: 0,
            type: "student"
          },
          {
            id: 3,
            name: "Admin - Principal Wilson",
            avatar: "PW",
            lastMessage: "Please submit your monthly report by Friday",
            timestamp: "Apr 20",
            unread: 1,
            type: "admin"
          },
          {
            id: 4,
            name: "Parent - David Rodriguez",
            avatar: "DR",
            lastMessage: "Can we schedule a meeting this week?",
            timestamp: "Apr 19",
            unread: 0,
            type: "parent"
          },
          {
            id: 5,
            name: "Clean Water Initiative Group",
            avatar: "CW",
            lastMessage: "New resources have been shared with the group",
            timestamp: "Apr 18",
            unread: 3,
            type: "group"
          }
        ];
        
        setConversations(conversationsData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load conversations. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  // Simulate fetching messages for a conversation
  const fetchMessages = async (conversationId) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock messages based on conversation ID
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const conversationMessages = [
        {
          id: 1,
          sender: conversationId === 1 ? "Parent - Sarah Johnson" : 
                  conversationId === 2 ? "Student - Michael Chen" : 
                  conversationId === 3 ? "Admin - Principal Wilson" : 
                  conversationId === 4 ? "Parent - David Rodriguez" : "Group Member",
          content: "Hi there! I wanted to check in about progress on the recent project.",
          timestamp: yesterday.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          date: yesterday.toLocaleDateString(),
          isMe: false,
          status: "read" // read, delivered, sent
        },
        {
          id: 2,
          sender: "Me",
          content: "Hello! Thanks for reaching out. The project is coming along well, we're about 75% complete.",
          timestamp: yesterday.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          date: yesterday.toLocaleDateString(),
          isMe: true,
          status: "read"
        },
        {
          id: 3,
          sender: conversationId === 1 ? "Parent - Sarah Johnson" : 
                  conversationId === 2 ? "Student - Michael Chen" : 
                  conversationId === 3 ? "Admin - Principal Wilson" : 
                  conversationId === 4 ? "Parent - David Rodriguez" : "Group Member",
          content: "That's great to hear! Any challenges I should be aware of?",
          timestamp: today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          date: today.toLocaleDateString(),
          isMe: false,
          status: "read"
        },
        {
          id: 4,
          sender: "Me",
          content: "We had some minor issues with resource allocation, but they've been resolved. We're on track to complete everything by the deadline.",
          timestamp: today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          date: today.toLocaleDateString(),
          isMe: true,
          status: "delivered"
        }
      ];
      
      if (conversationId === 1) {
        conversationMessages.push({
          id: 5,
          sender: "Parent - Sarah Johnson",
          content: "Thank you for the update on Tim's progress!",
          timestamp: today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          date: today.toLocaleDateString(),
          isMe: false,
          status: "read"
        });
        
        conversationMessages.push({
          id: 6,
          sender: "Parent - Sarah Johnson",
          content: "Is there anything we can do at home to help reinforce what he's learning?",
          timestamp: today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          date: today.toLocaleDateString(),
          isMe: false,
          status: "read"
        });
      }
      
      setMessages(conversationMessages);
      setIsLoading(false);
      
      // Mark as read when opened
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === conversationId ? { ...conv, unread: 0 } : conv
        )
      );
      
      // Show mobile conversation view
      setShowMobileConversation(true);
      
    } catch (err) {
      setError('Failed to load messages. Please try again later.');
      setIsLoading(false);
    }
  };

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Create new message
    const newMsg = {
      id: messages.length + 1,
      sender: "Me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      date: new Date().toLocaleDateString(),
      isMe: true,
      status: "sent"
    };
    
    // Add to messages
    setMessages([...messages, newMsg]);
    
    // Update last message in conversations
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedConversation ? { 
          ...conv, 
          lastMessage: newMessage,
          timestamp: "Just now" 
        } : conv
      )
    );
    
    // Clear input
    setNewMessage('');
    
    // Simulate message delivery status update
    setTimeout(() => {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToList = () => {
    setShowMobileConversation(false);
  };

  // Render loading state
  if (isLoading && !selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-4 rounded-full animate-spin mb-4 mx-auto" 
            style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }}></div>
          <p className="text-lg font-semibold" style={{ color: '#B8860B' }}>Loading messages...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && !selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 rounded-lg bg-white shadow-lg max-w-md">
          <AlertCircle size={48} className="mx-auto mb-4" style={{ color: '#D4AF37' }} />
          <h2 className="text-xl font-bold mb-2" style={{ color: '#B8860B' }}>Error</h2>
          <p className="mb-4">{error}</p>
          <button 
            className="px-4 py-2 rounded-md text-white transition-colors duration-200"
            style={{ backgroundColor: '#D4AF37' }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = message.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className={`w-full md:w-1/3 lg:w-1/4 border-r ${showMobileConversation ? 'hidden md:block' : 'block'}`}
      >
        <div className="p-4 border-b">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring w-full"
              style={{ borderColor: '#D4AF37', focusRing: '#F5EFD5' }}
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No conversations found
            </div>
          ) : (
            filteredConversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                  selectedConversation === conversation.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: conversation.type === 'admin' ? '#D4AF37' : 
                                             conversation.type === 'parent' ? '#F5EFD5' : 
                                             conversation.type === 'group' ? '#B8860B' : '#f0f0f0',
                             color: conversation.type === 'parent' ? '#B8860B' : '#ffffff' }}
                  >
                    {conversation.avatar}
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.timestamp}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span 
                          className="ml-2 flex-shrink-0 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white"
                          style={{ backgroundColor: '#D4AF37' }}
                        >
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Conversation Detail - Full screen on mobile when selected */}
      <div 
        className={`w-full md:w-2/3 lg:w-3/4 flex flex-col ${!selectedConversation || !showMobileConversation ? 'hidden md:flex' : 'flex'}`}
      >
        {selectedConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b flex items-center" style={{ backgroundColor: '#F5EFD5' }}>
              <button 
                className="mr-2 md:hidden" 
                onClick={handleBackToList}
              >
                <ChevronLeft size={24} />
              </button>
              
              {conversations.find(c => c.id === selectedConversation) && (
                <>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: conversations.find(c => c.id === selectedConversation).type === 'admin' ? '#D4AF37' : 
                                       conversations.find(c => c.id === selectedConversation).type === 'parent' ? '#F5EFD5' : 
                                       conversations.find(c => c.id === selectedConversation).type === 'group' ? '#B8860B' : '#f0f0f0',
                      color: conversations.find(c => c.id === selectedConversation).type === 'parent' ? '#B8860B' : '#ffffff'
                    }}
                  >
                    {conversations.find(c => c.id === selectedConversation).avatar}
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold">{conversations.find(c => c.id === selectedConversation).name}</h2>
                    <p className="text-xs text-gray-500">
                      {conversations.find(c => c.id === selectedConversation).type === 'admin' ? 'Administrative Staff' : 
                       conversations.find(c => c.id === selectedConversation).type === 'parent' ? 'Parent/Guardian' : 
                       conversations.find(c => c.id === selectedConversation).type === 'group' ? 'Group Chat' : 'Student'}
                    </p>
                  </div>
                </>
              )}
              
              <div className="ml-auto flex">
                {/* Optional action buttons */}
                <button className="text-gray-500 hover:text-gray-700 ml-2">
                  <User size={20} />
                </button>
                <button className="text-gray-500 hover:text-gray-700 ml-2">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#f9f9f9' }}>
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <div className="w-8 h-8 border-4 border-t-4 rounded-full animate-spin" 
                    style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }}></div>
                </div>
              ) : (
                Object.keys(groupedMessages).map(date => (
                  <div key={date}>
                    <div className="flex justify-center my-4">
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {date === new Date().toLocaleDateString() ? 'Today' : 
                         date === new Date(Date.now() - 86400000).toLocaleDateString() ? 'Yesterday' : 
                         date}
                      </span>
                    </div>
                    {groupedMessages[date].map(message => (
                      <div 
                        key={message.id} 
                        className={`mb-4 flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                            message.isMe ? 'rounded-br-none' : 'rounded-bl-none'
                          }`}
                          style={{ 
                            backgroundColor: message.isMe ? '#F5EFD5' : 'white',
                            borderColor: '#D4AF37',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                          }}
                        >
                          {!message.isMe && (
                            <p className="text-xs font-medium mb-1" style={{ color: '#B8860B' }}>
                              {message.sender}
                            </p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <div className="flex justify-end items-center mt-1">
                            <span className="text-xs text-gray-500 mr-1">{message.timestamp}</span>
                            {message.isMe && (
                              <span className="text-xs text-gray-500">
                                {message.status === 'sent' ? <Clock size={12} /> : 
                                 message.status === 'delivered' ? <Check size={12} /> : 
                                 <CheckCheck size={12} style={{ color: '#D4AF37' }} />}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring"
                  style={{ borderColor: '#D4AF37', focusRing: '#F5EFD5' }}
                />
                <button 
                  type="submit" 
                  className="p-2 rounded-r-md text-white flex items-center justify-center"
                  style={{ backgroundColor: '#D4AF37' }}
                  disabled={!newMessage.trim()}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#F5EFD5' }}
              >
                <MessageCircle size={24} style={{ color: '#D4AF37' }} />
              </div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#B8860B' }}>No Conversation Selected</h2>
              <p className="text-gray-600">Select a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Import these to your TeacherPage.jsx file
function MessageCircle({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}