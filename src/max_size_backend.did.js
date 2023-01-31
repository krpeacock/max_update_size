export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'store' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
