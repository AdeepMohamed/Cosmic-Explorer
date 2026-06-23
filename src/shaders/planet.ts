// ─── Planet Surface Shaders ───────────────────────────────────────────────

export const planetVertexShader = /* glsl */`
  uniform float time;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vViewDirection = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const planetFragmentShader = /* glsl */`
  uniform float time;
  uniform float planetType;
  uniform vec3 sunPosition;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;

  // ── Simplex 3D noise ──────────────────────────────────────────────────────
  vec3 mod289v3(vec3 x) { return x - floor(x*(1.0/289.0))*289.0; }
  vec4 mod289v4(vec4 x) { return x - floor(x*(1.0/289.0))*289.0; }
  vec4 permute(vec4 x)  { return mod289v4(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289v3(i);
    vec4 p = permute(permute(permute(
        i.z+vec4(0.0,i1.z,i2.z,1.0))
      + i.y+vec4(0.0,i1.y,i2.y,1.0))
      + i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_*D.wyz - D.xzx;
    vec4 j  = p - 49.0*floor(p*ns.z*ns.z);
    vec4 x_ = floor(j*ns.z);
    vec4 y_ = floor(j - 7.0*x_);
    vec4 x  = x_*ns.x + ns.yyyy;
    vec4 y  = y_*ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0+1.0;
    vec4 s1 = floor(b1)*2.0+1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m = m*m;
    return 42.0*dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  float fbm(vec3 p, int oct) {
    float v=0.0, a=0.5, f=1.0;
    for(int i=0;i<8;i++){
      if(i>=oct) break;
      v += a*snoise(p*f);
      a *= 0.5; f *= 2.05;
    }
    return v;
  }

  // ── Earth-like ────────────────────────────────────────────────────────────
  vec3 earthSurface(vec3 p, out float spec) {
    float h = fbm(p*2.2, 7) + fbm(p*9.0+vec3(73.1), 3)*0.22;
    float detail = snoise(p*18.0)*0.06;
    h += detail;
    spec = 0.0;
    if(h < -0.12){
      spec = 0.85;
      return mix(vec3(0.01,0.04,0.22), vec3(0.03,0.12,0.42), (h+0.3)/0.18);
    } else if(h < 0.0){
      spec = mix(0.85, 0.05, (h+0.12)/0.12);
      return mix(vec3(0.03,0.15,0.44), vec3(0.18,0.52,0.32), (h+0.12)/0.12);
    } else if(h < 0.18){
      return mix(vec3(0.14,0.42,0.16), vec3(0.2,0.52,0.18), h/0.18);
    } else if(h < 0.38){
      return mix(vec3(0.2,0.52,0.18), vec3(0.4,0.32,0.18), (h-0.18)/0.2);
    } else if(h < 0.55){
      return mix(vec3(0.38,0.3,0.22), vec3(0.55,0.5,0.46), (h-0.38)/0.17);
    }
    spec = 0.25;
    return mix(vec3(0.85,0.88,0.92), vec3(0.96,0.97,1.0), (h-0.55)/0.25);
  }

  // ── Cyber city ────────────────────────────────────────────────────────────
  vec3 cyberSurface(vec3 p, out float spec) {
    spec = 0.6;
    float base = fbm(p*3.0, 5)*0.5+0.5;
    vec3 dark = vec3(0.01,0.01,0.06);
    vec3 mid  = vec3(0.03,0.02,0.12);
    vec3 surf = mix(dark, mid, base);

    // Grid lines (latitude/longitude style)
    vec2 gUV = vUv * 24.0;
    float gx = 1.0 - smoothstep(0.0, 0.05, abs(fract(gUV.x)-0.5));
    float gy = 1.0 - smoothstep(0.0, 0.05, abs(fract(gUV.y)-0.5));
    float grid = max(gx, gy);
    surf = mix(surf, uColor1, grid*0.9);

    // City clusters from noise
    float city = smoothstep(0.55, 0.85, fbm(p*6.0, 4));
    surf = mix(surf, uColor2*0.6, city*0.7);

    // Bright neon nodes
    float nodes = smoothstep(0.75, 0.95, fbm(p*14.0+vec3(31.0), 3));
    surf += nodes * uColor1 * 1.8;
    return surf;
  }

  // ── Innovation / ocean tech world ─────────────────────────────────────────
  vec3 innovSurface(vec3 p, out float spec) {
    float h = fbm(p*2.5, 6);
    spec = 0.0;
    vec3 col;
    if(h < 0.05){
      spec = 0.9;
      col = mix(vec3(0.0,0.08,0.28), vec3(0.0,0.3,0.55), (h+0.25)/0.3);
    } else {
      col = mix(vec3(0.02,0.22,0.35), vec3(0.05,0.35,0.4), (h-0.05)/0.5);
    }
    float bio = smoothstep(0.5, 0.85, fbm(p*11.0+vec3(time*0.1), 3));
    col += bio * vec3(0.0,0.7,0.9) * 0.5;
    return col;
  }

  // ── Desert / experience ───────────────────────────────────────────────────
  vec3 desertSurface(vec3 p, out float spec) {
    spec = 0.08;
    float h = fbm(p*2.8, 6);
    float crack = 1.0-smoothstep(0.0,0.04,abs(fbm(p*12.0,3)));
    vec3 col = mix(vec3(0.55,0.32,0.08), vec3(0.75,0.5,0.18), smoothstep(-0.2,0.5,h));
    col = mix(col, vec3(0.35,0.15,0.04), smoothstep(0.35,0.7,h));
    col -= crack * vec3(0.15,0.08,0.02);
    return col;
  }

  // ── Crystal / achievements ────────────────────────────────────────────────
  vec3 crystalSurface(vec3 p, out float spec) {
    spec = 0.95;
    float h = fbm(p*3.2, 6);
    float facet = abs(snoise(p*10.0));
    vec3 gold = mix(vec3(0.28,0.18,0.0), vec3(0.88,0.68,0.1), smoothstep(-0.2,0.6,h));
    gold = mix(gold, vec3(1.0,0.92,0.45), smoothstep(0.45,0.75,h));
    vec3 crystal = vec3(0.92,0.88,1.0);
    return mix(gold, crystal, smoothstep(0.6,0.9,facet));
  }

  // ── Comm / contact ────────────────────────────────────────────────────────
  vec3 commSurface(vec3 p, out float spec) {
    spec = 0.55;
    float h = fbm(p*2.2, 5);
    vec3 col = mix(vec3(0.04,0.0,0.1), vec3(0.45,0.0,0.55), smoothstep(-0.3,0.4,h));
    float ring = abs(snoise(vec3(length(p.xz)*5.5, p.y*2.2, time*0.3)));
    col += smoothstep(0.6,0.95,ring)*vec3(0.9,0.1,0.9)*0.7;
    return col;
  }

  void main() {
    vec3 sunDir = normalize(sunPosition - vWorldPosition);
    float diffuse = max(dot(vNormal, sunDir), 0.0);
    float ambient = 0.04;

    float spec = 0.0;
    vec3 surfColor;
    int pType = int(planetType + 0.5);

    if(pType == 0)      surfColor = earthSurface(vPosition, spec);
    else if(pType == 1) surfColor = cyberSurface(vPosition, spec);
    else if(pType == 2) surfColor = innovSurface(vPosition, spec);
    else if(pType == 3) surfColor = desertSurface(vPosition, spec);
    else if(pType == 4) surfColor = crystalSurface(vPosition, spec);
    else                surfColor = commSurface(vPosition, spec);

    // Specular highlight (Blinn-Phong)
    vec3 halfV = normalize(sunDir + vViewDirection);
    float specPow = pow(max(dot(vNormal, halfV), 0.0), 80.0) * spec;
    vec3 specColor = vec3(1.0, 0.96, 0.88) * specPow;

    // Cloud layer (animated UV)
    float cloudTime = time * 0.04;
    vec3 cloudP = vPosition + vec3(cloudTime, 0.0, cloudTime*0.5);
    float cloud = fbm(cloudP*2.8, 4);
    float cloudMask = smoothstep(0.18, 0.52, cloud);
    if(pType==0 || pType==2){
      surfColor = mix(surfColor, vec3(0.93,0.96,1.0), cloudMask*0.75);
    }

    // Night-side city glow (Earth)
    vec3 nightGlow = vec3(0.0);
    if(pType == 0 && diffuse < 0.25){
      float city = smoothstep(0.42,0.72, fbm(vPosition*9.0+vec3(500.0),3));
      nightGlow = city * vec3(1.0,0.82,0.35) * (0.25 - diffuse) * 4.0;
    }
    // Neon self-illumination for cyber planet
    if(pType == 1){
      float glow = smoothstep(0.7, 0.95, fbm(vPosition*14.0+vec3(31.0),3));
      nightGlow += glow * uColor1 * 1.5;
    }
    // Crystal self-illumination
    if(pType == 4){
      float glitter = smoothstep(0.7,0.95, abs(snoise(vPosition*16.0)));
      nightGlow += glitter * vec3(1.0,0.9,0.4) * 0.8;
    }

    vec3 finalColor = surfColor * (diffuse + ambient) + specColor + nightGlow;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ─── Atmosphere Rim Shader ─────────────────────────────────────────────────

export const atmosphereVertexShader = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const atmosphereFragmentShader = /* glsl */`
  uniform vec3 atmosphereColor;
  uniform float atmosphereIntensity;
  uniform vec3 sunPosition;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);
    rim = pow(rim, 3.5);

    vec3 sunDir = normalize(sunPosition - vWorldPosition);
    float sunFacing = dot(vNormal, sunDir)*0.5+0.5;

    vec3 dayColor = atmosphereColor * 1.4;
    vec3 termColor = atmosphereColor * vec3(1.0, 0.6, 0.3);
    vec3 finalColor = mix(termColor, dayColor, sunFacing);

    float alpha = rim * atmosphereIntensity * (0.5 + 0.5*sunFacing);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;
