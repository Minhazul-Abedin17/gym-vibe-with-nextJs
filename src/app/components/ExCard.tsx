import { IWork } from '@/app/workout-type';
import Image from 'next/image';
import React from 'react';
import { FaFireFlameCurved } from 'react-icons/fa6';
import { FiClock , FiStar } from 'react-icons/fi'; // react-icons ব্যবহার করা হয়েছে

const WorkOut = ({ card } : { card : IWork}) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden bg-[#12141a] text-white shadow-lg border border-gray-800">
      {/* কার্ডের ছবি */}
      <div className="relative w-full h-52">
        <Image 
          src={card.image} 
          alt={card.name} 
          fill
          className="object-cover"
        />
      </div>

      {/* কার্ডের বডি/কনটেন্ট */}
      <div className="p-5">
        {/* মাসল গ্রুপ বা ব্যাজ (যদি অ্যারে অথবা স্ট্রিং থাকে) */}
        <div className="flex flex-wrap gap-2 mb-3">
          {Array.isArray(card.muscleGroups) ? (
            card.muscleGroups.map((group, index) => (
              <span 
                key={index} 
                className="bg-[#ccff00] text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {group}
              </span>
            ))
          ) : (
            <span className="bg-[#ccff00] text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {card.muscleGroups}
            </span>
          )}
        </div>

        {/* টাইটেল / নাম */}
        <h2 className="text-xl font-black uppercase tracking-wide mb-1 text-white">
          {card.name}
        </h2>

        {/* ইকুইপমেন্ট / সাবটাইটেল */}
        <p className="text-sm text-gray-400 mb-4 capitalize">
          {card.equipment}
        </p>

        {/* সেপারেটর লাইন */}
        <div className="border-t border-gray-800/80 my-3"></div>

        {/* ফুটারের ইনফরমেশন (সময়, ক্যালোরি, রেটিং) */}
        <div className="flex items-center justify-between text-xs text-gray-300 font-medium pt-1">
          {/* সময় */}
          <div className="flex items-center gap-1.5">
            <FiClock className="text-gray-400 text-sm" />
            <span>{card.duration}</span>
          </div>

          {/* ক্যালোরি */}
          <div className="flex items-center gap-1.5">
            <FaFireFlameCurved className="text-gray-400 text-sm" />
            <span>{card.caloriesBurned}</span>
          </div>

          {/* রেটিং */}
          <div className="flex items-center gap-1.5">
            <FiStar className="text-gray-400 text-sm" />
            <span>{card.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOut;