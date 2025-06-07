export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Dance Area - Half Screen */}
      <div className="h-[50vh] bg-gray-950 relative overflow-hidden border-b-4 border-gray-800 shadow-inner">
        {/* Inset shadow effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        <div className="absolute inset-0 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5),inset_0_-10px_20px_rgba(0,0,0,0.3)]"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Hero Dance Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <button className="group relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 active:scale-95">
            {/* Outer glow ring */}
            <div className="absolute -inset-2 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

            {/* Inner button */}
            <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center border border-purple-400/30 shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)]">
              <span className="text-white text-3xl font-bold drop-shadow-lg">
                舞
              </span>
            </div>

            {/* Highlight effect */}
            <div className="absolute top-3 left-3 w-4 h-4 bg-white/30 rounded-full blur-sm"></div>
          </button>
        </div>

        {/* Ambient particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main content - Bottom Half */}
      <div className="min-h-[50vh] flex items-center justify-center p-4 bg-gray-900">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Artist Name */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-wider uppercase">
              GiGi Dagostino
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide uppercase"></h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          {/* Tour Dates Header */}
          <div className="mt-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-8">
              World Tour 2025
            </h3>

            {/* Tour Dates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold text-lg">TOKYO</p>
                    <p className="text-gray-300">Shibuya Sky Arena</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-semibold">JUN 15</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold text-lg">LONDON</p>
                    <p className="text-gray-300">O2 Arena</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-semibold">JUL 03</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold text-lg">NEW YORK</p>
                    <p className="text-gray-300">Madison Square Garden</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-semibold">AUG 20</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold text-lg">SYDNEY</p>
                    <p className="text-gray-300">Qudos Bank Arena</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-semibold">SEP 12</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold text-lg">BERLIN</p>
                    <p className="text-gray-300">Mercedes-Benz Arena</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-semibold">OCT 05</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold text-lg">SAO PAULO</p>
                    <p className="text-gray-300">Allianz Parque</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-semibold">NOV 18</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest mb-8">
              Follow GiGi
            </h3>
            
            <div className="flex justify-center space-x-6 md:space-x-8">
              {/* Facebook */}
              <a 
                href="#" 
                className="group bg-gray-800/50 backdrop-blur p-4 rounded-full border border-gray-700 hover:border-blue-500 hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-8 h-8 text-gray-300 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Twitter */}
              <a 
                href="#" 
                className="group bg-gray-800/50 backdrop-blur p-4 rounded-full border border-gray-700 hover:border-sky-500 hover:bg-sky-500/20 transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-8 h-8 text-gray-300 group-hover:text-sky-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="#" 
                className="group bg-gray-800/50 backdrop-blur p-4 rounded-full border border-gray-700 hover:border-pink-500 hover:bg-pink-500/20 transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-8 h-8 text-gray-300 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.535-.757-.939-1.173-2.145-1.173-3.402 0-1.258.416-2.464 1.173-3.403.757-.939 1.908-1.535 3.205-1.535s2.448.596 3.205 1.535c.757.939 1.173 2.145 1.173 3.403 0 1.257-.416 2.463-1.173 3.402-.757.939-1.908 1.535-3.205 1.535zm7.718 0c-1.297 0-2.448-.596-3.205-1.535-.757-.939-1.173-2.145-1.173-3.402 0-1.258.416-2.464 1.173-3.403.757-.939 1.908-1.535 3.205-1.535s2.448.596 3.205 1.535c.757.939 1.173 2.145 1.173 3.403 0 1.257-.416 2.463-1.173 3.402-.757.939-1.908 1.535-3.205 1.535z"/>
                </svg>
              </a>

              {/* Snapchat */}
              <a 
                href="#" 
                className="group bg-gray-800/50 backdrop-blur p-4 rounded-full border border-gray-700 hover:border-yellow-500 hover:bg-yellow-500/20 transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-8 h-8 text-gray-300 group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.535-.757-.939-1.173-2.145-1.173-3.402 0-1.258.416-2.464 1.173-3.403.757-.939 1.908-1.535 3.205-1.535s2.448.596 3.205 1.535c.757.939 1.173 2.145 1.173 3.403 0 1.257-.416 2.463-1.173 3.402-.757.939-1.908 1.535-3.205 1.535zm7.718 0c-1.297 0-2.448-.596-3.205-1.535-.757-.939-1.173-2.145-1.173-3.402 0-1.258.416-2.464 1.173-3.403.757-.939 1.908-1.535 3.205-1.535s2.448.596 3.205 1.535c.757.939 1.173 2.145 1.173 3.403 0 1.257-.416 2.463-1.173 3.402-.757.939-1.908 1.535-3.205 1.535z"/>
                </svg>
              </a>
            </div>
            
            <p className="text-gray-400 mt-6 text-sm">
              Stay connected for exclusive content and behind-the-scenes updates
            </p>
          </div>

          {/* Tech stack indicator */}
          <div className="mt-12 p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <span className="text-sm font-mono">Powered by</span>
              <span className="text-blue-400 font-semibold">Next.js</span>
              <span className="text-gray-500">•</span>
              <span className="text-cyan-400 font-semibold">Tailwind CSS</span>
              <span className="text-gray-500">•</span>
              <span className="text-white font-semibold">Dark Mode</span>
            </div>
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
