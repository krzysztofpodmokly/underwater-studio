uniform vec2 winResolution;
uniform sampler2D uTexture;
uniform float uIorR;
uniform float uIorY;
uniform float uIorG;
uniform float uIorC;
uniform float uIorB;
uniform float uIorP;
uniform float uRefractPower;
uniform float uChromaticAberration;
uniform float uSaturation;
uniform float uShininess;
uniform float uDiffuseness;
uniform vec3 uLight;
uniform float uFresnelPower;

varying vec3 worldNormal;
varying vec3 eyeVector;

const int LOOP = 16;

float fresnel(vec3 eyeVector, vec3 worldNormal, float power) {
  float fresnelFactor = abs(dot(eyeVector, worldNormal));
  float inversefresnelFactor = 1.0 - fresnelFactor;

  return pow(inversefresnelFactor, power);
}

vec3 sat(vec3 rgb, float intensity) {
  vec3 L = vec3(0.2125, 0.7154, 0.0721);
  vec3 grayscale = vec3(dot(rgb, L));
  return mix(grayscale, rgb, intensity);
}

float specular(vec3 light, float shininess, float diffuseness) {
  vec3 normal = worldNormal;
  vec3 lightVector = normalize(-light);
  vec3 halfVector = normalize(eyeVector + lightVector);

  float NdotL = dot(normal, lightVector);
  float NdotH =  dot(normal, halfVector);
  float NdotH2 = NdotH * NdotH;

  float kDiffuse = max(0.0, NdotL);
  float kSpecular = pow(NdotH2, shininess);

  return  kSpecular + kDiffuse * diffuseness;
}

void main() {
  
  float iorRatioRed = 1.0 / uIorR;
  float iorRatioYellow = 1.0 / uIorY;
  float iorRatioGreen = 1.0 / uIorG;
  float iorRatioCyan = 1.0 / uIorC;
  float iorRatioBlue = 1.0 / uIorB;
  float iorRatioViolet = 1.0 / uIorP;

  vec3 color = vec3(0.0, 0.0627451 +0.3, 0.0666667 + 0.3); // Starting bubble color

  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = worldNormal;

  for (int i = 0; i < LOOP; i++) {
    float slide = float(i) / float(LOOP) * 0.1;

    vec3 refractVecR = refract(eyeVector, normal, iorRatioRed);
    vec3 refractVecY = refract(eyeVector, normal, iorRatioYellow);
    vec3 refractVecG = refract(eyeVector, normal, iorRatioGreen);
    vec3 refractVecC = refract(eyeVector, normal, iorRatioCyan);
    vec3 refractVecB = refract(eyeVector, normal, iorRatioBlue);
    vec3 refractVecP = refract(eyeVector, normal, iorRatioViolet);

   float r = texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 0.5;

    float y = (texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 +
                texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y * 2.0 -
                texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z) / 6.0;

    float g = texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).y * 0.5;

    float c = (texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).y * 2.0 +
                texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).z * 2.0 -
                texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).x) / 6.0;
          
    float b = texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).z * 0.5;

    float p = (texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z * 2.0 +
                texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 -
                texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y) / 6.0;

    float R = r + (2.0*p + 2.0*y - c)/3.0;
    float G = g + (2.0*y + 2.0*c - p)/3.0;
    float B = b + (2.0*c + 2.0*p - y)/3.0;

    color.r += R;
    color.g += G;
    color.b += B;

    color = sat(color, uSaturation);
  }

  // Divide by the number of layers to normalize colors (rgb values can be worth up to the value of LOOP)
  color /= float(LOOP);

  // Specular
  float specularLight = specular(uLight, uShininess, uDiffuseness);
  color += specularLight;

  float f  = fresnel(eyeVector, normal, uFresnelPower);
  color.rgb += f * vec3(1.0);

  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}