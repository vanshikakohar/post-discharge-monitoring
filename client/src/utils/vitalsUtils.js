// client/src/utils/vitalsUtils.js

export function isAbnormal(vital) {
  const temp = parseFloat(vital.temperature);
  const pulse = parseInt(vital.pulse);
  const bp = vital.bloodPressure.trim().split("/").map(Number);

  const abnormalTemp = temp < 36.1 || temp > 37.2;
  const abnormalPulse = pulse < 60 || pulse > 100;
  const abnormalBP =
    bp.length === 2 && (bp[0] < 90 || bp[0] > 140 || bp[1] < 60 || bp[1] > 90);

  return abnormalTemp || abnormalPulse || abnormalBP;
}
