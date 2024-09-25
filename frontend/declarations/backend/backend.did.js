export const idlFactory = ({ IDL }) => {
  const BlogPost = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'createdAt' : IDL.Int,
  });
  return IDL.Service({
    'createPost' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'deletePost' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getPost' : IDL.Func([IDL.Nat], [IDL.Opt(BlogPost)], ['query']),
    'getPosts' : IDL.Func([], [IDL.Vec(BlogPost)], ['query']),
    'updatePost' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
