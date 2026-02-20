import Map "mo:core/Map";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

actor {
  type HighScore = {
    score : Nat;
    timestamp : Int;
  };

  module HighScore {
    public func compare(highScore1 : HighScore, highScore2 : HighScore) : Order.Order {
      Nat.compare(highScore1.score, highScore2.score);
    };
  };

  let highScores = Map.empty<Principal, HighScore>();

  public shared ({ caller }) func setHighScore(score : Nat, timestamp : Int) : async () {
    let newScore : HighScore = {
      score;
      timestamp;
    };
    if (highScores.containsKey(caller)) {
      let currentScore = highScores.get(caller);
      switch (currentScore) {
        case (?currentScore) {
          if (currentScore.score > score) {
            return;
          };
        };
        case (null) {};
      };
    };
    highScores.add(caller, newScore);
  };

  public query ({ caller }) func getHighScore() : async Nat {
    switch (highScores.get(caller)) {
      case (null) { 0 : Nat };
      case (?record) { record.score };
    };
  };

  public query ({ caller }) func getAllHighScores() : async [(Principal, HighScore)] {
    highScores.toArray();
  };
};
