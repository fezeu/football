const PROXY_CONFIG = [
  {
      context: [
          "/photoequipe",
          "/equipe",
          "/carton",
          "/joueur",
          "/terrain",
          "/user",
          "/login",
          "/tournois",
          "/basique_info",
          "/logout",
          "/tournois",
          "/tournois_create",
          "/arbitre",
          "/match",
          "/match_poule",
          "/poule",
          "/poule_all",
          "/match_equipes"
      ],
      target: "http://localhost:3000",
      secure: false,
      
  },
  {
    '/images':{
        target: "http://localhost:3000",
        secure: false,
        "pathRewrite": {
            "^/images": ""
          }
    }
  }
]

module.exports = PROXY_CONFIG;