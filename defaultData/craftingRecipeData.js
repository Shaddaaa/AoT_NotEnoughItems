//an object with id:recipe pairs
//each recipe looks like this: {id, ingredients, results, successChance}, 
//ingredient and results each are objects containing: name:count pairs
//id and successChance each are simply one name:count pair
let craftingRecipeData = {
  "cr001": {
    "ingredients": {
      "twig": 1,
      "time": 5
    },
    "tools": {
      "chisel": 1
    },
    "results": {
      "tinder": 1
    }
  },
  "cr002": {
    "ingredients": {
      "flint": 1,
      "time": 10
    },
    "tools": {
      "chisel": 1
    },
    "results": {
      "sharp flint": 1
    }
  },
  "cr003": {
    "ingredients": {
      "log": 1,
      "time": 15
    },
    "tools": {
      "chisel": 1
    },
    "results": {
      "wooden stick": 1
    }
  },
  "cr004": {
    "ingredients": {
      "wooden stick": 1,
      "time": 50
    },
    "tools": {
      "chisel": 1
    },
    "results": {
      "arrow shaft": 3
    }
  },
  "cr005": {
    "ingredients": {
      "sharp flint": 1,
      "wooden stick": 1,
      "time": 90
    },
    "tools": {},
    "results": {
      "flint hatchet": 3
    }
  },
  "cr006": {
    "ingredients": {
      "sharp flint": 1,
      "time": 60
    },
    "tools": {
      "chisel": 1
    },
    "results": {
      "flint spearhead": 3
    }
  },
  "cr007": {
    "ingredients": {
      "flint spearhead": 1,
      "time": 60
    },
    "tools": {
      "flint": 1
    },
    "results": {
      "flint arrowhead": 3
    }
  },
  "cr008": {
    "ingredients": {
      "uncut sapphire": 1,
      "time": 90
    },
    "tools": {
      "chisel": 1
    },
    "results": {
      "sapphire": 1
    }
  },
  "cr009": {
    "ingredients": {
      "twig": 1,
      "thread": 1,
      "time": 10
    },
    "tools": {},
    "results": {
      "weak bow": 1
    }
  },
  "cr010": {
    "ingredients": {
      "bronze hammerhead": 1,
      "wooden stick": 1,
      "time": 240
    },
    "tools": {},
    "results": {
      "bronze hammer": 1
    }
  },
  "cr011": {
    "ingredients": {
      "twig": 1,
      "thread": 1,
      "fishing hook": 1,
      "time": 180
    },
    "tools": {},
    "results": {
      "fishing rod": 1
    }
  },
  "cr012": {
    "ingredients": {
      "uncut emerald": 1,
      "time": 120
    },
    "tools": {
      "chisel": 1
    },
    "results": {
      "emerald": 1
    }
  },
  "cr013": {
    "ingredients": {
      "flint spearhead": 1,
      "wooden stick": 1,
      "time": 120
    },
    "tools": {},
    "results": {
      "flint spear": 3
    }
  },
  "cr014": {
    "ingredients": {
      "wooden stick": 1,
      "thread": 1,
      "fishing hook": 1,
      "time": 600
    },
    "tools": {},
    "results": {
      "strong fishing rod": 1
    }
  },
  "cr015": {
    "ingredients": {
      "uncut ruby": 1,
      "time": 240
    },
    "tools": {
      "chisel": 1
    },
    "results": {
      "ruby": 1
    }
  },
  "cr016": {
    "ingredients": {
      "uncut opal": 1,
      "time": 300
    },
    "tools": {
      "chisel": 1
    },
    "results": {
      "opal": 1
    }
  }
}