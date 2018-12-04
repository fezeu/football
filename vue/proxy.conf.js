const PROXY_CONFIG = [
  {
      context: [
          "/equipe",
          "/carton",
          "/joueur",
          "/terrain",
          "/user",
          "/login"
      ],
      target: "http://localhost:3000",
      secure: false
  }
]

module.exports = PROXY_CONFIG;