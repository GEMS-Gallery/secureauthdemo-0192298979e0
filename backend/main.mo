import Bool "mo:base/Bool";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";

actor {
  type BlogPost = {
    id: Nat;
    title: Text;
    content: Text;
    createdAt: Int;
  };

  var posts : [BlogPost] = [];
  var nextId : Nat = 0;

  public func createPost(title: Text, content: Text) : async Nat {
    let post : BlogPost = {
      id = nextId;
      title = title;
      content = content;
      createdAt = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    nextId - 1
  };

  public query func getPosts() : async [BlogPost] {
    posts
  };

  public query func getPost(id: Nat) : async ?BlogPost {
    Array.find(posts, func(post: BlogPost) : Bool { post.id == id })
  };

  public func updatePost(id: Nat, title: Text, content: Text) : async Bool {
    posts := Array.map(posts, func(post: BlogPost) : BlogPost {
      if (post.id == id) {
        {
          id = post.id;
          title = title;
          content = content;
          createdAt = post.createdAt;
        }
      } else {
        post
      }
    });
    true
  };

  public func deletePost(id: Nat) : async Bool {
    let initialLength = posts.size();
    posts := Array.filter(posts, func(post: BlogPost) : Bool { post.id != id });
    posts.size() != initialLength
  };
};
