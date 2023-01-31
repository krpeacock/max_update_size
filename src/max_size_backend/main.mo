import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
actor {
  var content : Blob = Blob.fromArray([]);

  public func store(blob : Blob) : async Text {
    let size = blob.size();
    return "Ingested blob of size " # Nat.toText(size) # "!";
  };
};
