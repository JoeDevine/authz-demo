package opademo

default allow=false

allow {
    is_jwt_valid
}

is_valid_group {
    input.Usergroup == data.GroupPermissions[input.Resource][_]
}

is_jwt_valid {
   valid_roles[_] == lower(claims.role)
}

valid_exp {
    now := time.now_ns() / 1000000000
    now <  claims.exp
}

valid_nbf {
    now := time.now_ns() / 1000000000
    claims.nbf <= now 
}

valid_roles:= {"admin", "guest"}

bearer_token := t {
    t := input.Token
}

claims := payload {
	[_, payload, _] := io.jwt.decode(bearer_token)
}