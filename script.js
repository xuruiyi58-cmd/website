const profiles = {
  emma: {
    handle: 'emma.woodhouse', name: 'Emma Woodhouse', avatar: 'media/emma/avatar.jpg', stats: ['68','1,320','412'],
    bio: ['Handsome, clever, and rich. 🎀','Matchmaking (almost) professionally','Hartfield, Highbury 📍'], followed: 'harriet.smith, mr.knightley and 28 others',
    stories: [['Hartfield','media/emma/post-3-hd.png'],['Friends','media/harriet/avatar.jpg'],['Matchmaking','media/harriet/post-1.jpg'],['Sketches','media/emma/post-2-hd.png'],['Highbury','media/hs/post-1b.jpg']],
    posts: [
      {img:['media/emma/post-1-hd.png'],place:'Abbey-Mill Farm',likes:146,date:'APRIL 1814',caption:"Nice enough, I suppose… but hardly Harriet's equal.",comments:[]},
      {img:['media/emma/post-2-hd.png'],place:'Hartfield',likes:312,date:'MAY 1814',caption:'A little portrait of my dearest Harriet. Some people simply deserve to be seen in a different light. 🎨✨',comments:[['harriet.smith',"Emma, you're far too kind! 🥹"],['mr.elton','A most beautiful portrait. What extraordinary talent!'],['emma.woodhouse','So glad you appreciate it, Mr Elton. 😉']]},
      {img:['media/emma/post-3-hd.png'],place:'houseandgarden.co.uk',likes:284,date:'MAY 1814',caption:"Someone's in love… 👀💕\nThe compliments. The portrait. The attention. Could it be any more obvious?",comments:[]}
    ]
  },
  hs: {
    handle:'H.S.', name:'Harriet Smith', avatar:'media/hs/avatar.jpg', stats:['7','82','103'], bio:['A quiet life, kindly shared. 🌷',"Mrs Goddard's School",'Highbury 📍'], followed:'robert.martin, emma.woodhouse and 9 others',
    stories:[['Abbey-Mill','media/hs/post-1a.jpg'],['Farm Days','media/hs/post-1b.jpg'],['Friends','media/hs/post-1c.jpg']],
    posts:[{img:['media/hs/post-1a.jpg','media/hs/post-1b.jpg','media/hs/post-1c.jpg'],place:'Abbey-Mill Farm',likes:47,date:'MARCH 1814',caption:'The loveliest two months at Abbey-Mill Farm! 🐄🌷 Long walks, evening games, and the kindest people. Already missing everyone.',comments:[['robert.martin','The farm is far too quiet without you.'],['harriet.smith','I miss it already! 🤍'],['emma.woodhouse',"How sweet! You'll have to tell me all about it."]] }]
  },
  harriet: {
    handle:'harriet.smith', name:'Harriet Smith', avatar:'media/harriet/avatar.jpg', stats:['32','481','326'], bio:['still learning 🌷',"A friend's encouragement goes a long way.",'Highbury 📍'], followed:'emma.woodhouse, jane.fairfax and 12 others',
    stories:[['Hartfield','media/harriet/post-3.jpg'],['Friends','media/emma/avatar.jpg'],['Portraits','media/emma/post-2-hd.png'],['Walks','media/hs/post-1b.jpg'],['Little Joys','media/hs/post-1c.jpg']],
    posts:[
      {img:['media/harriet/post-1.jpg'],place:"Mrs Goddard's School",likes:109,date:'APRIL 1814',caption:'He asked me to marry him. 💌\nI never expected such a letter. He was so kind, and it was so beautifully written. I wish I knew what to do.',comments:[]},
      {img:['media/harriet/post-2-hd.png'],place:'Highbury',likes:138,date:'APRIL 1814',caption:'I said no. 💔 He was always so kind to me. But perhaps Emma is right… Maybe I should expect something more.',comments:[['emma.woodhouse','You deserve so much better, my dear. 💕']]},
      {img:['media/harriet/post-3.jpg'],place:'Hartfield',likes:246,date:'MAY 1814',caption:"Such a lovely afternoon at Hartfield. I still can't believe how much attention Mr Elton paid to my portrait… 🎀",comments:[['emma.woodhouse','Some people have excellent taste. 😉💕'],['mr.elton','A truly delightful work of art!']]},
      {img:['media/harriet/post-4.jpg'],place:'Hartfield',likes:231,date:'MAY 1814',caption:"A little riddle from Mr Elton…\nCOURTSHIP 💌\nCould it really mean what Emma thinks?",comments:[['harriet.smith',"I don't quite know what to make of this… 🤍"],['emma.woodhouse',"Oh Harriet, isn't it obvious? 👀💕"]]},
      {img:['media/harriet/post-5-hd.png'],place:'Highbury',likes:184,date:'DECEMBER 1814',caption:'I suppose I misunderstood everything. Some things are better left unsaid. 🤍',comments:[['emma.woodhouse',"I'm so sorry, Harriet."],['harriet.smith','You were only trying to help.']]}
    ]
  }
};

const scenes = [
  {no:'01',title:'A first impression',lens:'CLASS & INFLUENCE',sub:'Emma turns a social judgment into doubt.',note:'Martin may be “good,” but Emma quietly reframes goodness as not good enough.',date:'APRIL 1814',messages:[['harriet','He really is a very good young man.'],['emma','I’m sure he is. But surely you could do better?'],['harriet','Do you really think so?','👍']]},
  {no:'02',title:'The proposal',lens:'CHOICE & PERSUASION',sub:'Advice becomes pressure—while pretending to be a choice.',note:'“Entirely yours” is immediately followed by the answer Emma wants Harriet to choose.',date:'LATER THAT MONTH',messages:[['harriet','Robert has proposed. I don’t know what to say.'],['emma','Of course, the decision is entirely yours.'],['emma','Though I wonder whether becoming a farmer’s wife is really what you want…'],['harriet','I hadn’t thought of it that way.']]},
  {no:'03',title:'The imagined romance',lens:'MISREADING & DESIRE',sub:'A polite compliment becomes “proof” of love.',note:'Emma’s confidence gives Harriet permission to believe the fantasy too.',date:'MAY 1814',messages:[['emma','Did you notice how Mr Elton admired your portrait?'],['harriet','I thought he was just being polite…'],['emma','Oh Harriet, you really don’t see it, do you?'],['harriet','Do you think he might actually like me?','❤️'],['emma','I would be very surprised if he didn’t.']]}
];

let current='emma', scene=0, thread='harriet', sent={};
const app=document.querySelector('#app');
const dialog=document.querySelector('#post-dialog');
const avatars={emma:'media/emma/avatar.jpg',harriet:'media/harriet/avatar.jpg',elton:'media/emma/post-2-hd.png'};

function profilePage(id){
  current=id; const p=profiles[id]; document.querySelector('#nav-avatar').src=p.avatar;
  document.querySelectorAll('[data-profile]').forEach(b=>b.classList.toggle('active',b.dataset.profile===id));
  app.innerHTML=`<section class="profile-page"><header class="profile-head"><div class="main-avatar"><img src="${p.avatar}" alt="${p.name}"></div><div class="overview"><div class="title"><h1>${p.handle}</h1><button>Following⌄</button><button data-messages>Message</button></div><div class="stats"><span><b>${p.stats[0]}</b> posts</span><span><b>${p.stats[1]}</b> followers</span><span><b>${p.stats[2]}</b> following</span></div><div class="bio"><b>${p.name}</b>${p.bio.map(x=>`<p>${x}</p>`).join('')}</div><p class="followed">Followed by <b>${p.followed}</b></p></div></header><div class="stories">${p.stories.map(s=>`<button><span><img src="${s[1]}" alt=""></span><b>${s[0]}</b></button>`).join('')}</div><div class="tabs">▦ &nbsp; POSTS</div><div class="grid">${p.posts.map((post,i)=>`<button data-post="${i}"><img src="${post.img[0]}" alt="Post by ${p.handle}"><i>♥ ${post.likes}&nbsp;&nbsp; ● ${post.comments.length}</i></button>`).join('')}</div><footer>HIGHBURY · 1814<br><i>A creative reimagining of Jane Austen’s Emma.</i></footer></section>`;
  bind(); window.scrollTo({top:0,behavior:'smooth'});
}

function avatar(handle){if(handle==='emma.woodhouse')return avatars.emma;if(handle==='harriet.smith')return avatars.harriet;return null}
function openPost(index){
  const p=profiles[current], post=p.posts[index];
  document.querySelector('#post-content').innerHTML=`<div class="modal-media"><img src="${post.img[0]}" alt="Full post image"><div class="thumbs">${post.img.map((x,i)=>`<button data-slide="${x}" class="${i?'':'active'}"></button>`).join('')}</div></div><article class="post-copy"><header><img src="${p.avatar}" alt=""><b>${p.handle}</b><small>${post.place}</small></header><div class="comments"><p><img src="${p.avatar}" alt=""><span><b>${p.handle}</b> ${post.caption.replaceAll('\n','<br>')}</span></p>${post.comments.map(c=>`<p>${avatar(c[0])?`<img src="${avatar(c[0])}" alt="">`:'<i class="unknown">•</i>'}<span><b>${c[0]}</b> ${c[1]}</span></p>`).join('')}</div><div class="actions">♡　◯　✈ <b>${post.likes} likes</b><small>${post.date}</small></div><form class="comment-form"><input placeholder="Add a comment…"><button>Post</button></form></article>`;
  dialog.showModal(); dialog.querySelectorAll('[data-slide]').forEach((b,i)=>b.onclick=()=>{dialog.querySelector('.modal-media>img').src=b.dataset.slide;dialog.querySelectorAll('[data-slide]').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
}

function bubbles(messages,key){return messages.concat((sent[key]||[]).map(x=>['emma',x])).map((m,i)=>`<div class="bubble-row ${m[0]==='emma'?'mine':''}"><img src="${avatars[m[0]]}" alt="${m[0]}"><div><small>${m[0]==='emma'?'Emma Woodhouse':m[0]==='harriet'?'Harriet Smith':'Mr Elton'}</small><p>${m[1]}</p>${m[2]?`<button class="reaction">${m[2]}</button>`:''}</div></div>`).join('')}
function messagesPage(){
  const s=scenes[scene], isHarriet=thread==='harriet', key=isHarriet?`h${scene}`:'elton';
  const messages=isHarriet?s.messages:[['elton','I thought my feelings were quite obvious, Miss Woodhouse.'],['emma','Of course! Harriet will be delighted! 💕'],['elton','Harriet? I was talking about YOU.']];
  app.innerHTML=`<section class="messages"><aside><h2>Messages</h2><button data-thread="harriet" class="${isHarriet?'active':''}"><img src="${avatars.harriet}" alt="Harriet"><span><b>Harriet 🤍🤍</b><small>Do you think he might actually like me?</small></span></button><button data-thread="elton" class="${!isHarriet?'active':''}"><img src="${avatars.elton}" alt="Mr Elton"><span><b>Mr Elton</b><small>Harriet? I was talking about YOU.</small></span></button></aside><section class="conversation"><header><img src="${isHarriet?avatars.harriet:avatars.elton}" alt=""><span><b>${isHarriet?'Harriet 🤍🤍':'Mr Elton'}</b><small>${isHarriet?'Active 4m ago':'Active now'}</small></span><i>♡　◉　•••</i></header><div class="message-body"><div class="intro"><small>${isHarriet?'EMMA ↔ HARRIET':'THE REVEAL'}</small><h1>${isHarriet?'How a suggestion becomes a story':'Emma reads the final message correctly—too late.'}</h1></div>${isHarriet?`<nav class="scene-tabs">${scenes.map((x,i)=>`<button data-scene="${i}" class="${scene===i?'active':''}">${x.no}<b>${x.title}</b></button>`).join('')}</nav>`:''}<article class="dm-card"><div class="stage-title"><small>${isHarriet?s.lens:'DRAMATIC IRONY'}</small><h2>${isHarriet?s.title:'“I was talking about YOU.”'}</h2><p>${isHarriet?s.sub:'Emma’s matchmaking theory meets the evidence she had refused to see.'}</p></div><div class="chat-profile"><img src="${isHarriet?avatars.harriet:avatars.elton}" alt=""><b>${isHarriet?'Harriet Smith':'Mr Elton'}</b><small>${isHarriet?'@harriet.smith · You follow each other':'@mr.elton · Active now'}</small></div><time>${isHarriet?s.date:'13:45'}</time><div class="bubble-list">${bubbles(messages,key)}</div><blockquote>${isHarriet?s.note:'The message exposes the distance between Emma’s certainty and everyone else’s actual desires.'}</blockquote>${isHarriet?`<div class="next">${scene?'<button data-prev>‹ Previous</button>':'<span></span>'}${scene<2?'<button data-next>Next chapter ›</button>':'<button data-thread="elton">Open Mr Elton’s message ›</button>'}</div>`:'<button class="return" data-thread="harriet">‹ Revisit Emma and Harriet’s messages</button>'}</article></div><form class="composer"><button type="button">♡</button><input placeholder="Message…"><button>Send</button></form></section></section>`;
  bind();
  document.querySelector('.composer').onsubmit=e=>{e.preventDefault();const input=e.currentTarget.querySelector('input');if(!input.value.trim())return;(sent[key]??=[]).push(input.value.trim());messagesPage()};
  document.querySelectorAll('.reaction').forEach(x=>x.onclick=()=>x.classList.toggle('active'));
}

function bind(){
  document.querySelectorAll('[data-profile]').forEach(x=>x.onclick=()=>profilePage(x.dataset.profile));
  document.querySelectorAll('[data-messages]').forEach(x=>x.onclick=()=>messagesPage());
  document.querySelectorAll('[data-post]').forEach(x=>x.onclick=()=>openPost(+x.dataset.post));
  document.querySelectorAll('[data-scene]').forEach(x=>x.onclick=()=>{scene=+x.dataset.scene;messagesPage()});
  document.querySelectorAll('[data-thread]').forEach(x=>x.onclick=()=>{thread=x.dataset.thread;messagesPage()});
  document.querySelector('[data-next]')?.addEventListener('click',()=>{scene++;messagesPage()});
  document.querySelector('[data-prev]')?.addEventListener('click',()=>{scene--;messagesPage()});
}

dialog.querySelector('.close').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelector('[data-home]').onclick=()=>profilePage(current);
profilePage('emma');
