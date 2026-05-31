/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, GraduationCap, Loader2, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Welcome to **KM University**, Mathura. I am your virtual Dean of Admissions and Academic Registrar. \n\nHow can I guide your scholarly journey today? Ask me about our flagship **School of Medical Sciences**, under-graduate eligibility, research initiatives, or trust scholarships.",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "What medical programs are offered?",
    "How do I qualify for Trust scholarships?",
    "Tell me about B.Tech CSE details",
    "What is the average placement package?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    // Simulate realistic response delay
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let replyText = "";

      if (lowerText.includes('medical') || lowerText.includes('hospital') || lowerText.includes('mbbs') || lowerText.includes('clinical') || lowerText.includes('doctor')) {
        replyText = "KM University's flagship wing is the **K.D. Medical College, Hospital and Research Center**. It features:\n\n* **Comprehensive Clinical Infrastructure**: Over 300+ super-specialty critical beds, functional cardiac cath labs, and 12 sterile surgical suites.\n* **Flagship MBBS & MD Programs**: Certified under apex medical councils with mandatory dynamic clinical rotations.\n* **Direct Patient Interaction**: Hands-on internship access under accredited diagnostic consultants.\n\nYou can apply directly via our **Admissions Portal** or request counseling under the clinical liaison desk!";
      } else if (lowerText.includes('scholarship') || lowerText.includes('trust') || lowerText.includes('fee') || lowerText.includes('shanti') || lowerText.includes('cost')) {
        replyText = "We offer prestigious financial aid through the **Shanti Devi Charitable Trust Scholarships**:\n\n* **100% Tuition Waiver**: Granted to high-merit students securing over 93% aggregate in Class XII or top ranks in qualifying tests.\n* **50% Tuition Waiver**: Granted for securing over 85% aggregate score.\n* **25% Merit Waiver**: Granted for securing over 78% aggregate score.\n\n*Note: Special bursaries are also reserved for direct sports achievements and dependents of military veterans.* Academic boards verify certificates on our digital portal.";
      } else if (lowerText.includes('engineering') || lowerText.includes('btech') || lowerText.includes('cse') || lowerText.includes('computer') || lowerText.includes('coding')) {
        replyText = "The **School of Engineering & Technology** is renowned for turning out leading technocrats. Key highlights:\n\n* **Industry Co-Designed Curriculum**: Academic modules co-architected with multinational cloud registry partners.\n* **Top Specializations**: B.Tech in CSE (AI & Machine Learning), Cloud Architectures, and Database Engineering.\n* **Advanced Sandbox Labs**: Over 400 high-speed coding workstations, IoT micro-controller rigs, and AI cluster units.\n* **Fast-Track Internships**: Structured corporate semesters starting as early as Year 3.";
      } else if (lowerText.includes('placement') || lowerText.includes('salary') || lowerText.includes('job') || lowerText.includes('package') || lowerText.includes('recruit')) {
        replyText = "Our **Training & Placement Cell** boasts an exemplary track record:\n\n* **Highest Package**: **₹ 42.0 Lakhs per Annum (LPA)** offered by international cloud database providers.\n* **Average Package**: **₹ 5.8 Lakhs per Annum (LPA)** across technical, clinical, and corporate disciplines.\n* **Top Recruiters**: Direct recruitment partnerships with Amazon Database Teams, NHS United Kingdom, Apollo Super-specialties, and leading corporate law firms.\n* **Global Internships**: 6-month industry residency projects with stipends up to ₹ 45,000 per month.";
      } else if (lowerText.includes('dental') || lowerText.includes('bds') || lowerText.includes('teeth')) {
        replyText = "The **K.D. Dental College & Hospital** offers state-of-the-art oral healthcare coaching:\n\n* **BDS & MDS Programs**: Rigorous clinical curricula with intensive practical components.\n* **Active OPD Services**: High patient footfall across departments like Orthodontics, Prosthodontics, and Oral Surgery, ensuring excellent hands-on clinical exposure.\n* **Advanced Dental Labs**: Equiped with high-definition digital radiography and modern dental chairs.";
      } else {
        replyText = "Thank you for reaching out to **KM University Counselor's Desk**!\n\nAs your Academic Advisor, I'm here to assist you with global qualifications and course syllabus pathways. Here is quick guidance:\n\n* **How to Register**: Click on **Admissions Portal** in the upper menu bar, complete the 3-step application form, and submit.\n* **Admissions Direct Link**: For instant response, click 'Apply Online on WhatsApp' on our Homepage to text our Registrar Desk.\n\nCould you please specialize if you are looking for medical, dental, engineering, or trust scholarships?";
      }

      const replyMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, replyMsg]);
      setLoading(false);
    }, 850);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "System refreshed. Welcome to **KM University**, Mathura. I am your virtual Dean of Admissions and Academic Registrar. How can I guide your academic journey today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div id="ai-assistant-wrapper" className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Absolute floating bubble button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 bg-[#0B2240] hover:bg-[#11315a] text-[#C5A059] hover:text-[#ebd19d] transition-all rounded-full flex items-center justify-center shadow-2xl border-2 border-[#C5A059] animate-bounce focus:outline-none"
          title="Consult Virtual Academic Advisor"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Expanded chat window container */}
      {isOpen && (
        <div className="w-[350px] sm:w-[380px] h-[500px] bg-white border-2 border-[#C5A059] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#0B2240] py-4 px-4 border-b border-[#ebd19d]/30 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 bg-[#C5A059] text-black rounded flex items-center justify-center">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-serif font-bold tracking-wide">University Academic Advisor</h4>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-mono tracking-wider text-gray-300">Powered by Google Gemini</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleReset}
                className="p-1 hover:bg-white/10 rounded transition-colors text-[#C5A059]"
                title="Reset Chat Session"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages block */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 bg-[#FBFBF9] space-y-3 scrollbar-thin scrollbar-thumb-gray-200"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <span className="text-[9px] text-gray-400 font-mono mb-0.5">
                  {msg.sender === 'user' ? 'You' : 'Dean\'s Advisor'}
                </span>
                <div className={`p-3 text-xs leading-relaxed rounded shadow-sm border ${
                  msg.sender === 'user' 
                    ? 'bg-[#142d4a] text-white border-blue-900 rounded-br-none'
                    : 'bg-white text-gray-900 border-gray-200 rounded-bl-none'
                }`}>
                  {/* Simplistic markdown translation for bold texts */}
                  {msg.text.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>
                      {para.split('**').map((chunk, cIdx) => (
                        cIdx % 2 === 1 ? <strong key={cIdx} className="font-semibold text-[#ebd19d] dark:text-[#C5A059]">{chunk}</strong> : chunk
                      ))}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mr-auto flex flex-col items-start max-w-[80%]">
                <span className="text-[9px] text-gray-400 font-mono mb-0.5">Dean's Advisor</span>
                <div className="bg-white text-gray-400 border border-gray-200 rounded rounded-bl-none p-3 shadow-sm flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#C5A059]" />
                  <span className="text-xs italic font-mono">Reviewing program registries...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick options panel */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5 justify-center">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="text-[10px] bg-white border border-gray-200 hover:border-[#C5A059] text-gray-700 hover:text-[#0B2240] px-2.5 py-1 rounded transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Form input */}
          <div className="p-3 border-t border-gray-200 bg-white flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputVal)}
              placeholder="Ask about admissions, scholarship criteria, results..."
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059] bg-gray-50"
              disabled={loading}
            />
            <button
              onClick={() => handleSendMessage(inputVal)}
              className="bg-[#0B2240] hover:bg-[#15345a] text-[#C5A059] p-2.5 rounded transition-all flex items-center justify-center border border-[#C5A059]"
              disabled={loading || !inputVal.trim()}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
